import type React from "react"
import { useState } from "react"
import { Save, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function AddCourseForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    modules: "",
    students: "",
    lastUpdated: "",
    status: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!formData.title || !formData.description || !formData.status) {
      setError("All fields are required")
      setIsLoading(false)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSuccess(true)
    setIsLoading(false)

    setTimeout(() => {
      setSuccess(false)
      setFormData({
        title: "",
        description: "",
        modules: "",
        students: "",
        lastUpdated: "",
        status: "",
      })
    }, 3000)
  }

  return (
    <Card className="w-full bg-gray-900 border-gray-800 text-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Add New Course</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-800 text-red-400">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-900/20 border-green-800 text-green-400">
              <CheckCircle className="h-4 w-4 mr-2" />
              <AlertDescription>Course has been successfully created!</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Course Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Advanced React Development"
                value={formData.title}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Course Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Detailed description of the course content"
                value={formData.description}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700 resize-none h-32"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modules">Number of Modules</Label>
              <Input
                id="modules"
                name="modules"
                type="number"
                placeholder="e.g. 8"
                value={formData.modules}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="students">Number of Students</Label>
              <Input
                id="students"
                name="students"
                type="number"
                placeholder="e.g. 150"
                value={formData.students}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastUpdated">Last Updated</Label>
              <Input
                id="lastUpdated"
                name="lastUpdated"
                type="date"
                value={formData.lastUpdated}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-gray-200">
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between pt-4">
              <Button type="submit" className="bg-gray-800 hover:bg-gray-700" disabled={isLoading || success}>
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Course...
                  </div>
                ) : success ? (
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Course Created
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Create Course
                  </div>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}
