// hooks/useLoadCourses.ts
import { useSetAtom } from "jotai";
import { userInfoAtom } from "@/state";
import { getCoursesFromSupabase } from "@/supabase/fetchcourses"; // Adjust the import path as necessary

export const useLoadCourses = () => {
  const setUserInfo = useSetAtom(userInfoAtom);

  const load = async () => {
    const courses = await getCoursesFromSupabase();

    // Set the user information correctly with all required fields
    setUserInfo({
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatar: "string",
      courses: courses,
    });
  };

  return { load };
};
