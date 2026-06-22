"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Mail, Phone, Clock, Send, CheckCircle, ArrowLeft } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create WhatsApp message
    const message = `Hi! I'm ${formData.name} (${formData.email})\n\nSubject: ${formData.subject}\nCategory: ${formData.category}\n\nMessage: ${formData.message}`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/919054892470?text=${encodedMessage}`

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      })
    }, 3000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Mobile-optimized Navigation */}
      <nav className="border-b bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/" className="flex items-center space-x-1 sm:space-x-2">
                    <span className="text-base sm:text-xl font-bold text-gray-900">NextStep</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Go to Home Page</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Mobile navigation */}
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/">
                      <Button size="sm" variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 bg-transparent">
                        <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Home
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Return to Home Page</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Desktop navigation */}
              <div className="hidden sm:flex items-center space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/assessment" className="text-gray-700 hover:text-blue-600 transition-colors text-sm">
                        Assessment
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Assess Your Career</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Mobile-optimized Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-6">Get in Touch</h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Have questions about your career? Need help? We're here to support you!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-12">
          {/* Contact Information - Mobile Stack */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl font-bold text-gray-900">Contact Info</CardTitle>
                <CardDescription className="text-sm sm:text-base">Reach out through any of these ways</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                    <Mail className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">yashchitroda7805@gmail.com</p>
                    <p className="text-gray-500 text-xs">Reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                    <Phone className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">WhatsApp</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">+91 7742052807</p>
                    <p className="text-gray-500 text-xs">Mon-Fri, 9AM-6PM IST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-orange-100 p-2 sm:p-3 rounded-lg">
                    <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Hours</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Mon-Fri: 9AM-6PM</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Sat: 10AM-4PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile-optimized FAQ */}
            <Card className="shadow-lg border-0">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">Quick Questions?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                    How accurate are results?
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    85%+ accuracy based on student feedback and success tracking.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                    Can I retake the test?
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">Yes! Retake anytime as your interests change.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                    Do you offer counseling?
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">We offer personalized career guidance sessions.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile-optimized Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-2xl font-bold text-gray-900">Send Message</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Fill out the form and we'll get back to you soon
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {isSubmitted ? (
                  <div className="text-center py-8 sm:py-12">
                    <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-600 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                      Your message was sent via WhatsApp. We'll reply soon!
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline" size="sm">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm sm:text-base">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Your name"
                          required
                          className="h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm sm:text-base">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="Your email"
                          required
                          className="h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm sm:text-base">
                          Category
                        </Label>
                        <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                          <SelectTrigger className="h-10 sm:h-12 text-sm sm:text-base">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Question</SelectItem>
                            <SelectItem value="assessment">About Assessment</SelectItem>
                            <SelectItem value="counseling">Career Help</SelectItem>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm sm:text-base">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleChange("subject", e.target.value)}
                          placeholder="Brief subject"
                          required
                          className="h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm sm:text-base">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="How can we help you?"
                        className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                        required
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 flex-1 h-10 sm:h-12 text-sm sm:text-base"
                        disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setFormData({
                            name: "",
                            email: "",
                            subject: "",
                            category: "",
                            message: "",
                          })
                        }
                        className="h-10 sm:h-12 text-sm sm:text-base"
                      >
                        Clear Form
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile-optimized Additional Resources */}
        <div className="mt-8 sm:mt-16">
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardHeader className="text-center p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Need Quick Help?</CardTitle>
              <CardDescription className="text-blue-100 text-sm sm:text-lg">
                Try these while waiting for our response
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
                <div className="bg-white/10 rounded-lg p-4 sm:p-6">
                  <Brain className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-blue-200" />
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Take Assessment</h3>
                  <p className="text-blue-100 text-xs sm:text-sm mb-3 sm:mb-4">Get instant career recommendations</p>
                  <Link href="/assessment">
                    <Button variant="secondary" size="sm" className="w-full text-xs sm:text-sm">
                      Start Now
                    </Button>
                  </Link>
                </div>

                <div className="bg-white/10 rounded-lg p-4 sm:p-6">
                  <Mail className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-blue-200" />
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Email Us</h3>
                  <p className="text-blue-100 text-xs sm:text-sm mb-3 sm:mb-4">Direct email for urgent matters</p>
                  <div className="flex flex-col gap-2">
                    <a href="mailto:yashchitroda7805@gmail.com">
                      <Button variant="secondary" size="sm" className="w-full text-xs sm:text-sm">
                        Open Email
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText("yashchitroda7805@gmail.com")
                        alert("Email copied!")
                      }}
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30 w-full text-xs sm:text-sm"
                    >
                      Copy Email
                    </Button>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 sm:p-6">
                  <Phone className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-blue-200" />
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">WhatsApp</h3>
                  <p className="text-blue-100 text-xs sm:text-sm mb-3 sm:mb-4">Chat with us instantly</p>
                  <a href="https://wa.me/917742052807" target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="sm" className="w-full text-xs sm:text-sm">
                      Chat Now
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
