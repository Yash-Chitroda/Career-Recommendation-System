"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user_id")
    setIsLoggedIn(false)
    router.push("/login")
  }

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      {/* Left side - Logo */}
      <Link href="/" className="text-xl font-bold text-blue-600">
        CareerCompass
      </Link>

      {/* Middle - Main navigation */}
      <div className="flex space-x-6">
        <Link href="/assessment" className="text-gray-700 hover:text-blue-600">
          Assessment
        </Link>
        <Link href="/contact" className="text-gray-700 hover:text-blue-600">
          Contact
        </Link>
        <Link href="/about" className="text-gray-700 hover:text-blue-600">
          About
        </Link>
      </div>

      {/* Right side - Auth buttons */}
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <Link href="/history" className="text-gray-700 hover:text-blue-600">
              History
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link href="/register" className="text-gray-700 hover:text-blue-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
