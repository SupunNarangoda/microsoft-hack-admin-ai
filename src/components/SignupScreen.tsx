import { useState } from "react"
import { Eye, EyeOff, UserPlus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"

// Import the signUpUser function
import { signUpUser } from "@/auth/signup";  

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!acceptTerms) {
      setError("You must accept the terms and conditions")
      setIsLoading(false)
      return
    }

    const { user, error: signUpError } = await signUpUser(formData.email, formData.password, formData.name)

    if (signUpError) {
      setError(signUpError)
      setIsLoading(false)
      return
    }

    window.location.href = "/login"
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="mx-auto w-full max-w-md bg-gray-900 border-gray-800 text-gray-200">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
        <CardDescription className="text-center text-gray-400">
          Enter your information to create an admin account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-400">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={acceptTerms} 
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} 
              className="border-gray-600 data-[state=checked]:bg-gray-700 data-[state=checked]:border-gray-700"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
            >
              I accept the{" "}
              <a href="/terms" className="text-gray-300 hover:text-white underline underline-offset-4">
                terms and conditions
              </a>
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 mt-4">
          <Button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </div>
            ) : (
              <div className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </div>
            )}
          </Button>
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-gray-300 hover:text-white underline underline-offset-4">
              Login
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
    </div>
  )
}
