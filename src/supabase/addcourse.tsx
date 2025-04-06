// services/courseService.ts
import { supabase } from "@/supabase/supabase"; // Adjust the import path as necessary

export async function addCourse({ coursename, description }: { coursename: string; description: string }) {
  const { data, error } = await supabase.from("course").insert([
    {
      coursename,
        university: "RMIT",
      description,
    },
  ])

  if (error) {
    throw new Error(error.message)
  }

  return data
}
