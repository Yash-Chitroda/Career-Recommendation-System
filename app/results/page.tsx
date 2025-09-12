"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Brain, Home } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadResult() {
      try {
        // First try cached result
        const cached = localStorage.getItem("careerPrediction")
        if (cached) {
          const parsed = JSON.parse(cached)
          if (parsed.recommendations) {
            setResults(parsed.recommendations)
          }
          setLoading(false)
          return
        }

        // Otherwise call backend with stored answers
        const raw = localStorage.getItem("assessmentData")
        if (!raw) {
          setError("No assessment data found. Please retake the test.")
          setLoading(false)
          return
        }
        const userAnswers = JSON.parse(raw)

        const resp = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userAnswers),
        })

        if (!resp.ok) {
          throw new Error(await resp.text())
        }

        const result = await resp.json()
        localStorage.setItem("careerPrediction", JSON.stringify(result))
        setResults(result.recommendations || [])
      } catch (err: any) {
        console.error("Results load error:", err)
        setError("Failed to load results. Check backend or try again.")
      } finally {
        setLoading(false)
      }
    }

    loadResult()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading your result...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-xl shadow-xl border-0">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Brain className="h-10 w-10 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Your Career Matches</CardTitle>
          <CardDescription>Top 3 careers recommended for you</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((res, idx) => (
                <div key={idx} className="p-4 border rounded-lg shadow-sm bg-white">
                  <p className="text-lg font-semibold text-blue-700">
                    #{idx + 1}: {res.career}
                  </p>
                  <p className="text-gray-600">
                    Confidence: {(res.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No career prediction available — try retaking the assessment.
            </p>
          )}

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link href="/assessment">
              <Button variant="outline">Retake Test</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
