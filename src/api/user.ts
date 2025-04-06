import { createClient } from "@supabase/supabase-js";
import { IUserInfo } from "@/state";
import { Result } from "@/api/utils";

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

if (!VITE_SUPABASE_URL || !VITE_SUPABASE_ANON_KEY) {
  throw new Error("Supabase URL or Anon Key is not defined");
}

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

// ✅ Checks if a user is logged in
export async function isLoggedIn() {
  const user = await supabase.auth.getUser();
  return user.error === null;
}

async function getUser(userId: string) {
  const { data: userData, error: userError } = await supabase
    .from("User")
    .select("*")
    .eq("userid", userId)
    .single();

  if (userError) {
    return null;
  }

  // Find the courses for the user
  const { data: courses, error: courseError } = await supabase
    .from("usercourse")
    .select("*")
    .eq("userid", userId)
    .eq("university", userData?.university);

  if (courseError) {
    return null;
  }

  // Make it a course name list
  const courseNames = courses.map((course) => course.coursename);

  const { data: chatData, error: chatError } = await supabase
    .from("chat")
    .select(
      `id,
        coursename,
        name,
        university,
        userid,
        message (
            id,
            content,
            role,
            timestamp
        )`,
    )
    .in("coursename", courseNames)
    .eq("university", userData.university);

  if (chatError) {
    return null;
  }

  const userInfo: IUserInfo = {
    name: userData.name,
    email: userData.email,
    avatar: userData.avatar,
    courses: courseNames,
  };

  return userInfo;
}

// ✅ Fetch user info from the Supabase 'User' table
export async function fetchUserInfo(): Promise<Result<IUserInfo | null>> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { success: true, data: null };
  }

  const userInfo = await getUser(user.id);
  if (!userInfo) {
    return { success: false, error: new Error("Failed to fetch user info") };
  }

  return { success: true, data: userInfo };
}


// ✅ Log in with Supabase auth
export async function logIn(
  email: string,
  password: string,
): Promise<Result<IUserInfo>> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { success: false, error };

  const userInfo = await getUser(data.user.id);
  if (!userInfo) {
    return { success: false, error: new Error("Failed to fetch user info") };
  }

  return { success: true, data: userInfo };
}

// ✅ Log out
export async function logOut(): Promise<Result<void>> {
  const { error } = await supabase.auth.signOut();

  if (error) return { success: false, error };
  return { success: true, data: undefined };
}
