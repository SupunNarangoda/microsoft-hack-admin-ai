import { useState, useEffect } from "react"
import { useAtom } from "jotai"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLoadCourses } from "@/supabase/useLoadCourses"

import { Search } from "lucide-react"
import { userInfoAtom } from "@/state" 

export default function CourseList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userInfo] = useAtom(userInfoAtom) 
  const { load } = useLoadCourses()

  useEffect(() => {
    load() 
  }, [load])

  const filteredCourses = userInfo?.courses?.filter(
    (course) => {
  
      const courseName = course?.coursename || ""
      const description = course?.description || ""
      
      return courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
             description.toLowerCase().includes(searchQuery.toLowerCase())
    }
  ) || []

  return (
    <div className="space-y-6">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search courses..."
          className="pl-8 bg-gray-900 border-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredCourses.length === 0 ? (
        <Card className="bg-gray-900 border-gray-800 text-gray-200 p-6 text-center">
          <p className="text-gray-400">No courses found.</p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course?.id || Math.random()} className="bg-gray-900 border-gray-800 text-gray-200">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold">{course?.coursename || "Untitled Course"}</CardTitle>
                </div>
                <CardDescription className="text-gray-400">{course?.description || "No description available."}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  {/* Content here */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}