"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Brain, Clock, Target, CheckCircle, Star, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface AssessmentData {
  Age: number | string
  Gender: "Male" | "Female" | string
  School_Type: "Public" | "Private" | string
  Socioeconomic_Status: "Low" | "Middle" | "High" | string
  Mathematics_Score: number | string
  Science_Score: number | string
  Language_Arts_Score: number | string
  Social_Studies_Score: number | string
  Mathematics_Improvement: number | string
  Science_Improvement: number | string
  Language_Arts_Improvement: number | string
  Social_Studies_Improvement: number | string
  Logical_Reasoning: number | string
  Critical_Thinking: number | string
  Analytical_Ability: number | string
  Creativity: number | string
  Communication: number | string
  Emotional_Intelligence: number | string
  Social_Skills: number | string
  Leadership: number | string
  Sports_Participation: boolean | string
  Sports_Involvement: number | string
  Arts_Participation: boolean | string
  Arts_Involvement: number | string
  Music_Participation: boolean | string
  Music_Involvement: number | string
  Science_Club_Participation: boolean | string
  Science_Club_Involvement: number | string
  Debate_Participation: boolean | string
  Debate_Involvement: number | string
  Community_Service_Participation: boolean | string
  Community_Service_Involvement: number | string
  Learning_Style: "Visual" | "Auditory" | "Kinesthetic" | string
  STEM_Score: number | string
  Business_Finance_Score: number | string
  Arts_Media_Score: number | string
  Healthcare_Score: number | string
  Education_Score: number | string
  Social_Services_Score: number | string
  Trades_Manufacturing_Score: number | string
  Government_Law_Score: number | string
}

const questions = [
  { id: "Age", title: "What is your age?", type: "radio", options: ["<18", "18-25", "25-40", "40+"] },
  { id: "Gender", title: "What is your gender?", type: "radio", options: ["Male", "Female"] },
  { id: "School_Type", title: "What type of school do you attend?", type: "radio", options: ["Public", "Private"] },
  { id: "Socioeconomic_Status", title: "What is your family's socioeconomic status?", type: "radio", options: ["Low", "Middle", "High"] },

  { id: "Mathematics_Score", title: "How would you rate your Mathematics skills?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Science_Score", title: "How would you rate your Science skills?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Language_Arts_Score", title: "How would you rate your Language Arts skills?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Social_Studies_Score", title: "How would you rate your Social Studies skills?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },

  { id: "Mathematics_Improvement", title: "How much have you improved in Mathematics recently?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Science_Improvement", title: "How much have you improved in Science recently?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Language_Arts_Improvement", title: "How much have you improved in Language Arts recently?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Social_Studies_Improvement", title: "How much have you improved in Social Studies recently?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },

  { id: "Logical_Reasoning", title: "How strong are your logical reasoning skills?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Critical_Thinking", title: "How strong is your critical thinking?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Analytical_Ability", title: "How strong are your analytical skills?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Creativity", title: "How creative are you?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },

  { id: "Communication", title: "How strong are your communication skills?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Emotional_Intelligence", title: "How strong is your emotional intelligence?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Social_Skills", title: "How strong are your social skills?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Leadership", title: "How strong are your leadership skills?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },

  { id: "Sports_Participation", title: "Do you participate in sports?", type: "radio", options: ["Yes","No"] },
  { id: "Sports_Involvement", title: "How involved are you in sports?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },

  { id: "Arts_Participation", title: "Do you participate in arts?", type: "radio", options: ["Yes","No"] },
  { id: "Arts_Involvement", title: "How involved are you in arts?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },

  { id: "Music_Participation", title: "Do you participate in music?", type: "radio", options: ["Yes","No"] },
  { id: "Music_Involvement", title: "How involved are you in music?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },

  { id: "Science_Club_Participation", title: "Do you participate in science clubs?", type: "radio", options: ["Yes","No"] },
  { id: "Science_Club_Involvement", title: "How involved are you in science clubs?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },

  { id: "Debate_Participation", title: "Do you participate in debates?", type: "radio", options: ["Yes","No"] },
  { id: "Debate_Involvement", title: "How involved are you in debates?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },

  { id: "Community_Service_Participation", title: "Do you participate in community service?", type: "radio", options: ["Yes","No"] },
  { id: "Community_Service_Involvement", title: "How involved are you in community service?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },

  { id: "Learning_Style", title: "What is your preferred learning style?", type: "radio", options: ["Visual","Auditory","Kinesthetic"] },

  { id: "STEM_Score", title: "How interested are you in STEM fields?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Business_Finance_Score", title: "How interested are you in Business & Finance?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Arts_Media_Score", title: "How interested are you in Arts & Media?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Healthcare_Score", title: "How interested are you in Healthcare?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Education_Score", title: "How interested are you in Education?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Social_Services_Score", title: "How interested are you in Social Services?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Trades_Manufacturing_Score", title: "How interested are you in Trades & Manufacturing?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
  { id: "Government_Law_Score", title: "How interested are you in Government & Law?", type: "radio", options: ["0.1","0.3","0.5","0.7","0.9","1.0"] },
]


export default function AssessmentPage() {
  const [stage, setStage] = useState<"intro" | "assessment" | "loading">("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData>>({})
  const router = useRouter()

  const handleStartAssessment = () => setStage("assessment")

  const handleAnswer = (questionId: string, value: string | string[] | boolean) => {
    setAssessmentData((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  // helper: map age bucket to numeric (simple representative)
  const mapAgeBucket = (v: string) => {
    switch (v) {
      case "<15": return 14
      case "15-18": return 16.5
      case "19-22": return 20.5
      case "23-26": return 24.5
      case "27+": return 30
      default: return Number(v) || 0
    }
  }

  // helper: yes/no => boolean
  const yesNoToBool = (v: any) => {
    if (typeof v === "boolean") return v
    if (typeof v === "string") {
      const s = v.trim().toLowerCase()
      return s === "yes" || s === "true" || s === "1"
    }
    return Boolean(v)
  }

const handleNext = async () => {
  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1)
    return
  }

  // final step
  setStage("loading")

  // build mappedData but keep categorical strings (server handles encodings)
  const mappedData: Record<string, any> = { ...assessmentData }

  // map age bucket to number if present
  if (mappedData.Age && typeof mappedData.Age === "string") {
    mappedData.Age = mapAgeBucket(mappedData.Age)
  }

  // convert participation yes/no to booleans
  const participationFields = [
    "Sports_Participation",
    "Arts_Participation",
    "Music_Participation",
    "Science_Club_Participation",
    "Debate_Participation",
    "Community_Service_Participation",
  ]
  participationFields.forEach((f) => {
    if (f in mappedData) mappedData[f] = yesNoToBool(mappedData[f])
  })

  // Convert numeric-like selects from strings to numbers
  Object.keys(mappedData).forEach((k) => {
    const v = mappedData[k]
    if (typeof v === "string") {
      const asNum = Number(v)
      if (!Number.isNaN(asNum)) mappedData[k] = asNum
    }
  })

  // persist the input (mapped)
  localStorage.setItem("assessmentData", JSON.stringify(mappedData))

  try {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("⚠️ You must log in before submitting the assessment.")
      setStage("assessment")
      return
    }

    const resp = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ send JWT token
      },
      body: JSON.stringify(mappedData),
    })

    if (!resp.ok) {
      const text = await resp.text()
      throw new Error(text || "Prediction failed")
    }

    const result = await resp.json()

    // save prediction
    localStorage.setItem("careerPrediction", JSON.stringify(result))

    // navigate to results
    router.push("/results")
  } catch (err) {
    console.error("Prediction error:", err)
    alert("Prediction failed — please try again or check backend logs.")
    setStage("assessment")
  }
}


  // --- UI rendering (unchanged) ---
  // Intro Stage - Fixed Navigation
  if (stage === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Fixed Mobile Navigation */}
        <nav className="border-b bg-white/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/" className="flex items-center space-x-2">
                      <span className="text-lg sm:text-xl font-bold text-gray-900">NextStep</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Go to Home Page</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Fixed Mobile Navigation Buttons */}
              <div className="flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/">
                        <Button size="sm" variant="outline" className="text-sm px-3 py-2 bg-transparent">
                          <ArrowLeft className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Back To</span> Home
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Return to Home Page</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/contact">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-sm px-3 py-2">
                          Contact
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get Help & Support</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Tighter Mobile Hero */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Find Your Perfect Career
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
                Take our smart AI test to discover careers that match your personality, skills, and dreams.
              </p>
            </div>
          </div>

          {/* Tighter Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 sm:mb-12">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">15 Minutes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm">
                  Quick test with 27 smart questions about your interests and skills
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">15+ Careers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm">
                  Get detailed info about salary, growth, and how to get started
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Perfect Match</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm">
                  AI finds careers that truly fit your personality and goals
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Compact What to Expect */}
          <Card className="shadow-lg border-0 mb-10 sm:mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">What We'll Ask You</CardTitle>
              <CardDescription className="text-base sm:text-lg text-gray-600">
                Our test covers everything to give you the best career matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Your Personality</h4>
                      <p className="text-gray-600 text-sm">How you like to work and solve problems</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Your Skills</h4>
                      <p className="text-gray-600 text-sm">What you're naturally good at</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Work Style</h4>
                      <p className="text-gray-600 text-sm">Office, remote, or outdoor work</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Your Goals</h4>
                      <p className="text-gray-600 text-sm">What motivates and excites you</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Industries</h4>
                      <p className="text-gray-600 text-sm">Tech, healthcare, business, and more</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Lifestyle</h4>
                      <p className="text-gray-600 text-sm">Work-life balance and salary expectations</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compact CTA */}
          <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
            <CardContent className="py-10 sm:py-12">
              <Zap className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-6 text-blue-200" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start?</h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of students who found their dream career
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={handleStartAssessment}
                className="w-full sm:w-auto text-lg px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-xl max-w-sm mx-auto"
              >
                Start Career Test Now
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <p className="text-blue-200 text-sm mt-4">✨ 100% Free • No signup needed • Get results instantly</p>
              <p className="text-red-200 text-base sm:text-lg mt-6 font-medium">
                We're here to help you, not make money from you! 💙
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (stage === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <p className="text-lg">Finding your careers...</p>
        </div>
      </div>
    )
  }

  // Assessment Stage (render question card)
  // Get the current question data
  const currentQuestionData = questions[currentQuestion];

  function handlePrevious(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }
  function isAnswered() {
    const val = assessmentData[currentQuestionData.id as keyof AssessmentData]
    if (currentQuestionData.type === "checkbox") {
      return Array.isArray(val) && val.length > 0
    }
    return val !== undefined && val !== "" && val !== null
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* keep your existing nav + card layout here — below I show just the question rendering block */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Calculate progress percentage */}
        {/** Progress is (currentQuestion + 1) / questions.length * 100 */}
        {(() => {
          var progress = ((currentQuestion + 1) / questions.length) * 100;
          return (
            <div className="mb-6">
              <div className="flex justify-between">
                <div>{currentQuestion + 1}/{questions.length}</div>
                <div>{Math.round(progress)}%</div>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          );
        })()}

        <Card>
          <CardHeader>
            <CardTitle>{currentQuestionData.title}</CardTitle>
            <CardDescription>{currentQuestionData.type === "checkbox" ? "Select all that apply" : "Choose the best option"}</CardDescription>
          </CardHeader>
          <CardContent>
            {currentQuestionData.type === "radio" && (
            <RadioGroup
              value={(assessmentData[currentQuestionData.id as keyof AssessmentData] as string) || ""}
              onValueChange={(value) => handleAnswer(currentQuestionData.id, value)}
              className="space-y-2"
            >
              {currentQuestionData.options!.map((option, index) => {
                const inputId = `${currentQuestionData.id}-${index}`
                return (
                  <label
                    key={index}
                    htmlFor={inputId}
                    className="flex items-center space-x-3 p-3 rounded-md border hover:bg-gray-100 transition-colors cursor-pointer w-full"
                  >
                    <RadioGroupItem value={option} id={inputId} className="h-4 w-4" />
                    <span className="text-sm text-gray-800">{option}</span>
                  </label>
                )
              })}
            </RadioGroup>
          )}


            {currentQuestionData.type === "select" && (
              <Select value={(assessmentData[currentQuestionData.id as keyof AssessmentData] as any) || ""} onValueChange={(value) => handleAnswer(currentQuestionData.id, value)}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {currentQuestionData.options!.map((option, idx) => <SelectItem key={idx} value={option}>{option}</SelectItem>)}
                </SelectContent>
              </Select>
            )}

            {currentQuestionData.type === "checkbox" && (
              <div className="space-y-2">
                {currentQuestionData.options!.map((option, idx) => {
                  const val = assessmentData[currentQuestionData.id as keyof AssessmentData]
                  const current = Array.isArray(val) ? val as string[] : []
                  const checked = current.includes(option)
                  return (
                    <div key={idx} className="flex items-start space-x-3 p-2 rounded-lg border">
                      <Checkbox id={`${currentQuestionData.id}-${idx}`} checked={checked} onCheckedChange={(c) => {
                        const val = assessmentData[currentQuestionData.id as keyof AssessmentData]
                        const cur = Array.isArray(val)
                          ? val as string[]
                          : []
                        if (c) handleAnswer(currentQuestionData.id, [...cur, option])
                        else handleAnswer(currentQuestionData.id, cur.filter(v => v !== option))
                      }} />
                      <Label htmlFor={`${currentQuestionData.id}-${idx}`}>{option}</Label>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between gap-4 mt-6">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}><ArrowLeft /> Previous</Button>
          <Button onClick={handleNext} disabled={!isAnswered()}>{currentQuestion === questions.length - 1 ? "Get My Results" : "Next"} <ArrowRight /></Button>
        </div>
      </div>
    </div>
  )
}