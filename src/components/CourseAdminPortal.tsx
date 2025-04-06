import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, User, LogOut } from "lucide-react"
import CourseList from "@/components/CourseList"
import CourseUpload from "@/components/CourseUpload"
import { Sidebar } from "@/components/Sidebar"
import { AddCourseForm } from "@/components/AddCourse"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

export default function CourseAdminPortal() {
  const [activeTab, setActiveTab] = useState<"courses" | "upload" | "add-course">("courses")
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/logout")
  }

  return (
    <div className="flex h-screen bg-black text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Course Admin Portal</h1>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-gray-200">
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab as (value: string) => void}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="courses">Manage Courses</TabsTrigger>
              <TabsTrigger value="upload">Upload Content</TabsTrigger>
              <TabsTrigger value="add-course">Add New Course</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Courses</h2>
                <Button className="bg-gray-800 hover:bg-gray-700" onClick={() => setActiveTab("add-course")}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Course
                </Button>
              </div>
              <CourseList />
            </TabsContent>
            <TabsContent value="upload" className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Upload Course Content</h2>
              </div>
              <CourseUpload />
            </TabsContent>
            <TabsContent value="add-course" className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Add New Course</h2>
              </div>
              <AddCourseForm />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}