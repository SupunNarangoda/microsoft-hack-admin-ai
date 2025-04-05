import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, MessageSquare, User } from "lucide-react"
import  CourseList  from "@/components/CourseList"
import  CourseUpload  from "@/components/CourseUpload"
import { Sidebar } from "@/components/Sidebar"

export default function CourseAdminPortal() {
  const [activeTab, setActiveTab] = useState<"courses" | "upload">("courses")

  return (
    <div className="flex h-screen bg-black text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Course Admin Portal</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab as (value: string) => void}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="courses">Manage Courses</TabsTrigger>
              <TabsTrigger value="upload">Upload Content</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Courses</h2>
                <Button className="bg-gray-800 hover:bg-gray-700">
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
          </Tabs>
        </main>
      </div>
    </div>
  )
}
