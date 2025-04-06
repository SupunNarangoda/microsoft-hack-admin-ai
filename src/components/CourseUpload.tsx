import React from "react"
import { useAtom } from "jotai"
import {
  selectedUploadCourseAtom,
  uploadedFilesAtom,
  uploadStatusAtom,
} from "@/state" 

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, X, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { userInfoAtom } from "@/state" 
import axios from 'axios'

export default function CourseUpload() {
  const [files, setFiles] = useAtom(uploadedFilesAtom)
  const [selectedCourse, setSelectedCourse] = useAtom(selectedUploadCourseAtom)
  const [uploadStatus, setUploadStatus] = useAtom(uploadStatusAtom)
  const [userInfo] = useAtom(userInfoAtom) 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter((file) => file.type === "application/pdf")
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    setUploadStatus("idle")

    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })
    formData.append('universityName', 'ExampleUniversity')
    formData.append('courseName', selectedCourse)

    try {
      const response = await axios.post(`${process.env.VITE_API_URL}/uploadfile/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log(response.data)

      setTimeout(() => {
        setUploadStatus("success")

        setTimeout(() => {
          setUploadStatus("idle")
          setFiles([]) 
        }, 3000)
      }, 1500)
    } catch (error) {
      console.error('Error uploading file:', error)

      setTimeout(() => {
        setUploadStatus("error")
        setTimeout(() => {
          setUploadStatus("idle")
        }, 3000)
      }, 1500)
    }
  }

  const courses = userInfo?.courses || []

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800 text-gray-200">
        <CardHeader>
          <CardTitle>Upload Course Materials</CardTitle>
          <CardDescription className="text-gray-400">
            Add PDF documents to your courses. Files will be available to enrolled students.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Course Select */}
          <div className="space-y-2">
            <Label htmlFor="course">Select Course</Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="bg-gray-900 border-gray-700">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800 text-gray-200">
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.coursename}>
                    {course.coursename}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Module Select
          <div className="space-y-2">
            <Label htmlFor="module">Select Module</Label>
            <Select disabled={!selectedCourse}>
              <SelectTrigger className="bg-gray-900 border-gray-700">
                <SelectValue placeholder="Select a module" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800 text-gray-200">
                {modules.map((module) => (
                  <SelectItem key={module.id} value={module.id}>
                    {module.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}

          {/* File Upload */}
          <div className="space-y-4">
            <Label>Upload PDF Files</Label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:bg-gray-800/50 transition-colors cursor-pointer">
              <Input
                type="file"
                id="pdf-upload"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf"
                multiple
              />
              <Label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-10 w-10 text-gray-500" />
                <h3 className="font-medium">Drag and drop your files here</h3>
                <p className="text-sm text-gray-500">or click to browse (PDF only)</p>
              </Label>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium">Selected Files ({files.length})</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div className="text-sm truncate max-w-[200px]">{file.name}</div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Alerts */}
          {uploadStatus === "success" && (
            <Alert variant="default" className="bg-green-900/20 border-green-800 text-green-400">
              <Check className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your files have been uploaded successfully.</AlertDescription>
            </Alert>
          )}

          {uploadStatus === "error" && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-400">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>There was a problem uploading your files. Please try again.</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-gray-800 hover:bg-gray-700"
            disabled={files.length === 0 || !selectedCourse || uploadStatus !== "idle"}
            onClick={handleUpload}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
