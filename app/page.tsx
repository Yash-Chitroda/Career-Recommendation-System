"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Zap, Users, Target } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    alert("Logged out!")
    localStorage.removeItem("token")
    localStorage.removeItem("user_id")
    localStorage.removeItem("username")
    setIsLoggedIn(false)
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Fixed Mobile Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
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

            {/* Mobile: Just the CTA button */}
            <div className="md:hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/assessment">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-sm px-4 py-2">
                        Start Test
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Take Career Assessment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Home
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Home Page</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/assessment" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Assessment
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Assess Your Career</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                      Contact
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get Help & Support</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* 👇 Show Login/Register if not logged in */}
              {!isLoggedIn && (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                          Login
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Login to your account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href="/register" className="text-gray-700 hover:text-blue-600 transition-colors">
                          Register
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Create a new account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}

              {/* 👇 Show History/Logout if logged in */}
              {isLoggedIn && (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href="/history" className="text-gray-700 hover:text-blue-600 transition-colors">
                          History
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your previous assessments</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={handleLogout}
                          className="text-gray-700 hover:text-red-600 transition-colors"
                        >
                          Logout
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Logout from your account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/assessment">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Start Assessment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Take Free Career Test</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Mobile menu - Hidden by default */}
          <div className="md:hidden hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                      Home
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Home Page</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/assessment"
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Career Assessment
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Assess Your Career</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/contact"
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Contact
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get Help & Support</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* 👇 Show Login/Register if not logged in */}
              {!isLoggedIn && (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                          Login
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Login to your account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href="/register" className="text-gray-700 hover:text-blue-600 transition-colors">
                          Register
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Create a new account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}

              {/* 👇 Show History/Logout if logged in */}
              {isLoggedIn && (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href="/history" className="text-gray-700 hover:text-blue-600 transition-colors">
                          History
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your previous assessments</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={handleLogout}
                          className="text-gray-700 hover:text-red-600 transition-colors"
                        >
                          Logout
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Logout from your account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}

              {/* CTA */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/assessment">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Start Assessment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Take Free Career Test</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Tighter mobile spacing */}
      <section className="py-8 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            {/* Mobile-optimized heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Find Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                Dream Career
              </span>
            </h1>

            {/* Shorter mobile description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Take our smart AI test and discover careers that match your skills and interests perfectly.
            </p>

            {/* Mobile-optimized CTA */}
            <Link href="/assessment">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-lg px-8 py-4 rounded-xl shadow-lg max-w-sm mx-auto"
              >
                Take Free Career Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-3">✨ 100% Free • 15 minutes • Instant results</p>
          </div>
        </div>
      </section>

      {/* Features Section - Tighter mobile layout */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Students Love Us?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of students to find their perfect career path
            </p>
          </div>

          {/* Tighter mobile grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Smart AI Test</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Advanced AI analyzes your answers to find perfect career matches
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Perfect Match</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Get careers that truly fit your personality and skills
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Real Info</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Salary details, job growth, and what you need to get started
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Quick Results</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Get your career recommendations in just 15 minutes
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Better mobile spacing */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Find Your Dream Career?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8">
            Join thousands of students who found their perfect career path
          </p>
          <Link href="/assessment">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto text-lg px-8 py-4 rounded-xl max-w-sm mx-auto"
            >
              Start Your Journey Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer - Tighter mobile layout */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 sm:col-span-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
                <span className="text-xl font-bold">NextStep</span>
              </div>
              <p className="text-gray-400 max-w-md mx-auto sm:mx-0">
                Helping students find their perfect career through smart AI-powered recommendations.
              </p>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/assessment" className="hover:text-white transition-colors">
                    Career Test
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CareerCompass. Made with ❤️ for students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
