"use client"

import { useEffect, useState } from "react"

interface Recommendation {
  career: string
  confidence: number | null
}

interface Assessment {
  id: number
  timestamp: string
  answers: Record<string, any>
  results: Recommendation[]
}

export default function HistoryPage() {
  const [history, setHistory] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setError("You must be logged in to view history.")
      setLoading(false)
      return
    }

    fetch("http://127.0.0.1:8000/history/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.detail || "Failed to fetch history")
        }
        return res.json()
      })
      .then((data) => {
        setHistory(data || [])
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="p-6 text-center">Loading your history...</p>
  }

  if (error) {
    return <p className="p-6 text-red-600 text-center">{error}</p>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Assessment History</h1>

      {history.length === 0 ? (
        <p className="text-gray-600">No assessments found.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((item) => (
            <li key={item.id} className="border p-4 rounded-lg shadow-sm bg-white">
              <p className="font-semibold text-gray-900">
                Taken on:{" "}
                <span className="text-blue-600">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </p>

              {/* Show top 3 results */}
              <div className="mt-2">
                <p className="font-medium">Predicted Careers:</p>
                <ol className="list-decimal list-inside ml-4 text-gray-700">
                  {item.results.map((res, idx) => (
                    <li key={idx}>
                      {res.career}{" "}
                      {res.confidence !== null && (
                        <span className="text-sm text-gray-500">
                          ({(res.confidence * 100).toFixed(1)}%)
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Show answers */}
              <details className="mt-3 text-sm text-gray-600">
                <summary className="cursor-pointer">View answers</summary>
                <pre className="mt-2 bg-gray-100 p-2 rounded-md overflow-x-auto text-xs">
                  {JSON.stringify(item.answers, null, 2)}
                </pre>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
