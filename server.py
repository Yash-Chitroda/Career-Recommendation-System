# server.py
import os
import traceback
from typing import Optional, Dict, Any, List

import joblib
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta

# Database imports
from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    DateTime,
    JSON,
    ForeignKey,
    Boolean,
)
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, Session

# Auth imports
from passlib.context import CryptContext
from jose import jwt, JWTError

# ---------------------------
# Configuration
# ---------------------------
DB_FILE = os.environ.get("DB_FILE", "career_app.db")
DATABASE_URL = f"sqlite:///{DB_FILE}"
SECRET_KEY = os.environ.get("SECRET_KEY", "change-this-secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# ---------------------------
# Database setup (SQLite)
# ---------------------------
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

    assessments = relationship("Assessment", back_populates="user")


class Assessment(Base):
    __tablename__ = "assessments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    answers = Column(JSON)
    results = Column(JSON)

    user = relationship("User", back_populates="assessments")


Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(data: dict, expires_min: int = ACCESS_TOKEN_EXPIRE_MINUTES):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_min)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError as e:
        raise HTTPException(status_code=401, detail="Token invalid or expired")


app = FastAPI(title="Career Recommendation ML API (with Auth & DB)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    model = joblib.load("career_rf_model.pkl")
except Exception as e:
    raise RuntimeError(f"Failed to load model: {e}")

# Attempt to read feature names from the sklearn model (if available)
model_feature_names = None
if hasattr(model, "feature_names_in_"):
    try:
        model_feature_names = list(model.feature_names_in_)
    except Exception:
        model_feature_names = None

# Fallback: explicit feature list (based on your dataset)
FALLBACK_FEATURE_NAMES = [
    "Age",
    "Gender",
    "School_Type",
    "Socioeconomic_Status",
    "Mathematics_Score",
    "Science_Score",
    "Language_Arts_Score",
    "Social_Studies_Score",
    "Mathematics_Improvement",
    "Science_Improvement",
    "Language_Arts_Improvement",
    "Social_Studies_Improvement",
    "Logical_Reasoning",
    "Critical_Thinking",
    "Analytical_Ability",
    "Creativity",
    "Communication",
    "Emotional_Intelligence",
    "Social_Skills",
    "Leadership",
    "Sports_Participation",
    "Sports_Involvement",
    "Arts_Participation",
    "Arts_Involvement",
    "Music_Participation",
    "Music_Involvement",
    "Science_Club_Participation",
    "Science_Club_Involvement",
    "Debate_Participation",
    "Debate_Involvement",
    "Community_Service_Participation",
    "Community_Service_Involvement",
    "Learning_Style",
    "STEM_Score",
    "Business_Finance_Score",
    "Arts_Media_Score",
    "Healthcare_Score",
    "Education_Score",
    "Social_Services_Score",
    "Trades_Manufacturing_Score",
    "Government_Law_Score",
]

FEATURE_ORDER = model_feature_names if model_feature_names is not None else FALLBACK_FEATURE_NAMES

# Mapping dicts used for categorical encodings (must match training)
GENDER_MAP = {"male": 0, "female": 1}
SCHOOL_MAP = {"public": 0, "private": 1}
SOCIO_MAP = {"low": 0, "middle": 1, "high": 2}
LEARNING_MAP = {"visual": 0, "auditory": 1, "kinesthetic": 2, "other": 3}

PARTICIPATION_COLS = [
    "Sports_Participation",
    "Arts_Participation",
    "Music_Participation",
    "Science_Club_Participation",
    "Debate_Participation",
    "Community_Service_Participation",
]


def as_binary(val: Any) -> int:
    if pd.isna(val):
        return 0
    s = str(val).strip().lower()
    if s in {"1", "yes", "true", "y", "t"}:
        return 1
    return 0


def preprocess(df: pd.DataFrame) -> pd.DataFrame:
    # Handle categorical columns
    if "Gender" in df.columns:
        df["Gender"] = df["Gender"].astype(str).str.strip().str.lower().map(GENDER_MAP).fillna(0).astype(int)
    if "School_Type" in df.columns:
        df["School_Type"] = df["School_Type"].astype(str).str.strip().str.lower().map(SCHOOL_MAP).fillna(0).astype(int)
    if "Socioeconomic_Status" in df.columns:
        df["Socioeconomic_Status"] = df["Socioeconomic_Status"].astype(str).str.strip().str.lower().map(SOCIO_MAP).fillna(1).astype(int)
    if "Learning_Style" in df.columns:
        df["Learning_Style"] = df["Learning_Style"].astype(str).str.strip().str.lower().map(LEARNING_MAP).fillna(0).astype(int)

    # Participation -> 0/1
    for col in PARTICIPATION_COLS:
        if col in df.columns:
            df[col] = df[col].apply(as_binary).astype(int)

    # Convert all other columns to numeric where possible
    for col in df.columns:
        if col in {"Gender", "School_Type", "Socioeconomic_Status", "Learning_Style"}:
            continue
        if col in PARTICIPATION_COLS:
            continue
        df[col] = pd.to_numeric(df[col], errors="coerce")

    df = df.fillna(0)

    # Ensure all expected feature columns exist; if missing, add with default 0
    for col in FEATURE_ORDER:
        if col not in df.columns:
            df[col] = 0

    # Reorder columns
    df = df[FEATURE_ORDER]

    return df

class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


# Generic wrapper for assessment input (any JSON is allowed)
class RawAssessment(BaseModel):
    __root__: Dict[str, Any]


def get_current_user(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)) -> Optional[User]:
    """
    If Authorization header provided and valid, return User object.
    If header is missing or invalid, return None (anonymous).
    """
    if not authorization:
        return None
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            return None
    except Exception:
        return None

    try:
        payload = decode_access_token(token)
        sub = payload.get("sub")
        if not sub:
            return None
        user = db.query(User).filter(User.email == sub).first()
        return user
    except Exception:
        return None

@app.post("/register")
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    # basic checks
    existing = db.query(User).filter((User.username == req.username) | (User.email == req.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="User with that username or email already exists")
    hashed = hash_password(req.password)
    u = User(username=req.username, email=req.email, password_hash=hashed)
    db.add(u)
    db.commit()
    db.refresh(u)
    return {"message": "registered", "user_id": u.id}


@app.post("/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer", "user_id": user.id}

@app.get("/")
def root():
    return {"status": "Career Recommendation API running", "model_loaded": True, "feature_count": len(FEATURE_ORDER)}


@app.post("/predict")
def predict(
    payload: RawAssessment,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  # 👈 force login
):
    """
    Expects a JSON object with keys matching your dataset columns.
    Returns top 3 predicted careers ranked by probability and saves the assessment.
    Requires Authorization: Bearer <token> header to tie record to the user.
    """
    if not current_user:
        raise HTTPException(status_code=401, detail="Login required to save assessments")

    try:
        raw = payload.__root__
        df = pd.DataFrame([raw])
        df_pre = preprocess(df)

        # Predict probabilities if available
        recommendations: List[Dict[str, Any]] = []
        try:
            probs = model.predict_proba(df_pre)[0]
            classes = list(map(str, model.classes_))
            top3_idx = np.argsort(probs)[::-1][:3]
            recommendations = [
                {"career": classes[i], "confidence": float(probs[i])}
                for i in top3_idx
            ]
        except Exception:
            # fallback to predict() if no predict_proba
            pred = model.predict(df_pre)[0]
            recommendations = [{"career": str(pred), "confidence": None}]

        # Save to DB tied to current user
        assessment = Assessment(
            user_id=current_user.id,
            answers=raw,
            results=recommendations,
        )
        db.add(assessment)
        db.commit()
        db.refresh(assessment)

        return {"recommendations": recommendations, "assessment_id": assessment.id}

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@app.get("/history/me")
def my_history(db: Session = Depends(get_db), current_user: Optional[User] = Depends(get_current_user)):
    """Return authenticated user's assessments. Requires Authorization header."""
    if not current_user:
        raise HTTPException(status_code=401, detail="Authentication required")
    rows = db.query(Assessment).filter(Assessment.user_id == current_user.id).order_by(Assessment.timestamp.desc()).all()
    return [
        {"id": r.id, "timestamp": r.timestamp.isoformat(), "answers": r.answers, "results": r.results}
        for r in rows
    ]


@app.get("/history/{user_id}")
def history_for_user(user_id: int, db: Session = Depends(get_db)):
    """Admin-style endpoint to fetch history for any user by id (no auth)"""
    rows = db.query(Assessment).filter(Assessment.user_id == user_id).order_by(Assessment.timestamp.desc()).all()
    return [
        {"id": r.id, "timestamp": r.timestamp.isoformat(), "answers": r.answers, "results": r.results}
        for r in rows
    ]
