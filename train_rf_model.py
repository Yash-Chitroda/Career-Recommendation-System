import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

# 1. Load dataset
df = pd.read_csv("processed_dataset.csv")

# 2. Drop columns we don’t want
df = df.drop(columns=["StudentID", "Secondary_Career_Recommendations", "Recommendation_Confidence"], errors="ignore")

# 3. Encode categorical features
for col in df.select_dtypes(include=["object"]).columns:
    if col != "Primary_Career_Recommendation":
        df[col] = LabelEncoder().fit_transform(df[col])

# 4. Features & Target
X = df.drop(columns=["Primary_Career_Recommendation"])
y = df["Primary_Career_Recommendation"]

# 5. Train/Test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 6. Random Forest Training
model = RandomForestClassifier(
    n_estimators=300,   # number of trees
    max_depth=None,     # let trees expand fully
    random_state=42,
    n_jobs=-1           # use all CPU cores
)
model.fit(X_train, y_train)

# 7. Evaluate
y_pred = model.predict(X_test)
print("✅ Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# 8. Save Model
joblib.dump(model, "career_rf_model.pkl")
print("🎉 Random Forest model saved as career_rf_model.pkl")