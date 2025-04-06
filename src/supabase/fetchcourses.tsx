// import { supabase } from "@/supabase/supabase"; // Adjust the import path as necessary
// import { ICourse } from "@/state";

// export const getCoursesFromSupabase = async (): Promise<ICourse[]> => {
//   const { data, error } = await supabase
//     .from("course")
//     .select("coursename,university, description");

//   if (error) {
//     console.error("Error fetching courses:", error);
//     return [];
//   }


//   return data as ICourse[];
// };

import { supabase } from "@/supabase/supabase";
import { ICourse } from "@/state";

export const getCoursesFromSupabase = async (): Promise<ICourse[]> => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("User not authenticated");
    return [];
  }

  const { data: userCourses, error: userCoursesError } = await supabase
    .from("usercourse")
    .select("coursename")
    .eq("userid", user.id);

  if (userCoursesError) {
    console.error("Error fetching user courses:", userCoursesError);
    return [];
  }

  const courseNames = userCourses.map((uc) => uc.coursename);

  if (courseNames.length === 0) return [];

  const { data: courses, error: courseError } = await supabase
    .from("course")
    .select("coursename, university, description")
    .in("coursename", courseNames); 

  if (courseError) {
    console.error("Error fetching course details:", courseError);
    return [];
  }

  return courses as ICourse[];
};


