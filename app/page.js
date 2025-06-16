"use client";
import { motion } from "framer-motion";
import FixedBar from "./components/fixedBar";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle, Play, Star, Target, Trophy, Users, Zap, Clock } from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-blue-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <Target className="h-5 w-5 text-white" />
          </div>
          <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Jovial
          </span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors">
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors"
          >
            How it Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors">
            Pricing
          </Link>
        </nav>
        <div className="ml-6 hidden md:flex gap-2">
          <Link
          href="/signIn" 
          className="px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-md transition-colors">
            Sign In
          </Link>
          <button className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-md transition-all">
            <a href="/signUp">Get Started</a>
          </button>
        </div>
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="ml-auto md:hidden p-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 bg-white z-50 md:hidden flex flex-col">
          <nav className="flex flex-col items-center justify-center flex-1 space-y-6 px-4">
            <Link
              href="#features"
              className="text-lg font-medium text-blue-700 hover:text-blue-900 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-lg font-medium text-blue-700 hover:text-blue-900 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link
              href="#pricing"
              className="text-lg font-medium text-blue-700 hover:text-blue-900 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="pt-6 flex flex-col items-center space-y-4">
              <Link 
              href="/sign-In"  
              className="px-6 py-2 text-base font-medium text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-md transition-colors">
                Sign In
              </Link>
              <button className="px-6 py-2 text-base font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-md transition-all">
                <a href="/signUp">Get Started</a>
              </button>
            </div>
          </nav>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left space-y-4">
                <div className="space-y-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit">
                    🔥 Build Better Habits Together
                  </span>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Master Your Routines with Friends
                  </h1>
                  <p className="max-w-[600px] mx-auto lg:mx-0 text-blue-700 md:text-xl">
                    Create powerful routines, focus together, and achieve your goals with real-time collaboration,
                    analytics, and friendly competition. Transform your productivity with the power of community.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all">
                    <Play className="mr-2 h-4 w-4" />
                    Start Your Journey
                  </button>
                  {/* <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium border border-blue-300 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                    Watch Demo
                  </button> */}
                </div>
                <div className="flex items-center gap-4 text-sm text-blue-600">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>Free to start</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-3xl opacity-20"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm border border-blue-200 shadow-2xl rounded-xl overflow-hidden">
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Team Focus Session</h3>
                      <p className="text-sm text-blue-600 mb-4">Sarah, Mike, and 3 others are focusing</p>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-blue-700 font-medium">Morning Routine</span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-blue-600">
                            <span>Focus Time</span>
                            <span>25:00</span>
                          </div>
                          <div className="w-full bg-blue-100 rounded-full h-2">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full w-3/4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ✨ Powerful Features
                </span>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Everything You Need to Succeed
                </h2>
                <p className="max-w-[900px] text-blue-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Powerful tools designed to help you build lasting habits, stay focused, and achieve your goals
                  together with friends.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 lg:grid-cols-3 lg:gap-12 justify-items-center lg:justify-items-start">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-lg transition-shadow rounded-xl p-6 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Collaborative Routines</h3>
                <p className="text-blue-600 flex-1">
                  Create and share routines with friends. Stay accountable and motivated together.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-lg transition-shadow rounded-xl p-6 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Focus Sessions</h3>
                <p className="text-blue-600 flex-1">
                  Pomodoro-style focus sessions with your team. Work together, stay focused together.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-lg transition-shadow rounded-xl p-6 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Real-time Analytics</h3>
                <p className="text-blue-600 flex-1">
                  Track your progress with detailed insights and beautiful visualizations.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-lg transition-shadow rounded-xl p-6 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Leaderboards</h3>
                <p className="text-blue-600 flex-1">
                  Compete with friends in a healthy way. See who's crushing their goals.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-lg transition-shadow rounded-xl p-6 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Smart Reminders</h3>
                <p className="text-blue-600 flex-1">
                  Never miss a routine with intelligent notifications and gentle nudges.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-lg transition-shadow rounded-xl p-6 h-full flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Goal Tracking</h3>
                <p className="text-blue-600 flex-1">
                  Set meaningful goals and track your journey with detailed progress metrics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  🚀 Simple Process
                </span>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  How Jovial Works
                </h2>
                <p className="max-w-[900px] text-blue-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started in minutes and transform your productivity with these simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-blue-800">Create Your Routine</h3>
                <p className="text-blue-600">
                  Set up your daily routines and habits. Add tasks, set timers, and customize your workflow.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-blue-800">Invite Your Friends</h3>
                <p className="text-blue-600">
                  Share your routines with friends and family. Create accountability partnerships that work.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-blue-800">Focus & Achieve</h3>
                <p className="text-blue-600">
                  Start focus sessions, track progress, and celebrate wins together. Watch your productivity soar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-100 to-indigo-100">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Loved by Productive Teams
                </h2>
                <p className="max-w-[900px] text-blue-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have transformed their productivity with Jovial.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-blue-400 text-blue-400" />
                    ))}
                  </div>
                  <p className="text-blue-700 mb-4">
                    "Jovial has completely changed how our team approaches daily goals. The collaborative features
                    are game-changing!"
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">Sarah Chen</p>
                      <p className="text-xs text-blue-600">Product Manager</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-blue-400 text-blue-400" />
                    ))}
                  </div>
                  <p className="text-blue-700 mb-4">
                    "The focus sessions with friends feature is incredible. We've increased our productivity by 300%!"
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">Mike Rodriguez</p>
                      <p className="text-xs text-blue-600">Software Developer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-blue-400 text-blue-400" />
                    ))}
                  </div>
                  <p className="text-blue-700 mb-4">
                    "The analytics and leaderboard keep us motivated. It's like having a personal coach for
                    productivity!"
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">Emma Thompson</p>
                      <p className="text-xs text-blue-600">Designer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-500 to-indigo-500">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Transform Your Productivity?
                </h2>
                <p className="max-w-[600px] mx-auto text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have already transformed their daily routines. Start your journey today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Play className="mr-2 h-4 w-4" />
                  <a href="signUp">Start Free</a>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-blue-200 bg-white/80 backdrop-blur-sm">
        <p className="text-xs text-blue-600">© 2025 Jovial. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-blue-600 hover:text-blue-800">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-blue-600 hover:text-blue-800">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-blue-600 hover:text-blue-800">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
