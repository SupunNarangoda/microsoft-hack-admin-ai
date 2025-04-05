import { useState } from "react"
import { useAtom } from "jotai"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, FileText, MoreVertical, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { userInfoAtom } from "@/state" 

export default function CourseList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userInfo] = useAtom(userInfoAtom) 

  const filteredCourses = userInfo?.courses?.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="bg-gray-900 border-gray-800 text-gray-200">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-gray-200">
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800">
                      <FileText className="mr-2 h-4 w-4" />
                      View Content
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-gray-800 focus:bg-gray-800 hover:text-red-500">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-gray-400">{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                {/* <div>{course.modules} modules</div> */}
                <div>{course.students} students</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">Last updated: {course.lastUpdated}</div>
                <Badge
                  variant={course.status === "Published" ? "default" : "secondary"}
                  className="bg-gray-800 hover:bg-gray-700"
                >
                  {course.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
