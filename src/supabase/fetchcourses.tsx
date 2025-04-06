import { supabase } from "@/supabase/supabase"; // Adjust the import path as necessary
import { ICourse } from "@/state";

export const getCoursesFromSupabase = async (): Promise<ICourse[]> => {
  const { data, error } = await supabase
    .from("course")
    .select("coursename,university, description");

  if (error) {
    console.error("Error fetching courses:", error);
    return [];
  }


  return data as ICourse[];
};

