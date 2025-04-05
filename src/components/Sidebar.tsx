import { useAtom } from "jotai"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Search, BookOpen, Settings, PlusCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { selectedCourseAtom, userInfoAtom } from "@/state" // Importing the required atoms

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [selectedCourse, setSelectedCourse] = useAtom(selectedCourseAtom)
  const [userInfo] = useAtom(userInfoAtom) // Access userInfoAtom to get the user's courses

  // Ensure userInfo and courses are available
  const courses = userInfo?.courses || []

  return (
    <div className="w-80 border-r border-gray-800 flex flex-col bg-black">
      <div className="p-4">
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-full border-gray-700 bg-gray-900">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-800 text-gray-200">
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.title}>
                {course.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-8 bg-gray-900 border-gray-700 focus-visible:ring-gray-700"
          />
        </div>
      </div>

      <Button variant="ghost" className="mx-4 justify-start mb-4">
        <PlusCircle className="mr-2 h-5 w-5" />
        New Course
      </Button>

      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-sm font-semibold">Recent Courses</h2>
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "" : "-rotate-90"}`} />
        </Button>
      </div>

      {isExpanded && (
        <div className="flex-1 overflow-auto">
          <div className="px-2">
            {courses.map((course) => (
              <Button
                key={course.id}
                variant="ghost"
                className="w-full justify-start py-2 px-4 text-left text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                {course.title}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto p-4 border-t border-gray-800">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-5 w-5" />
          Settings
        </Button>
      </div>
    </div>
  )
}
