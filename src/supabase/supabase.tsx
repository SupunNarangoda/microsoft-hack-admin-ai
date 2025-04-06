// // Initialize the JS client
// import { createClient } from '@supabase/supabase-js'
// const supabase = createClient("https://phneaplvejdxwieobkfe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBobmVhcGx2ZWpkeHdpZW9ia2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MDM5NzAsImV4cCI6MjA1OTQ3OTk3MH0.Lv8PoIDXJaHQvtuRU3LnmD8PLNlZH7PxGjK_MsOQlVQ")
// // Make a request
// const { data: todos, error } = await supabase.from('todos').select('*')


// Initialize the JS client
import { createClient } from '@supabase/supabase-js';
const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;


// Create the Supabase client with your URL and API key
export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);


if (!VITE_SUPABASE_URL || !VITE_SUPABASE_ANON_KEY) {
  throw new Error("Supabase URL or Anon Key is not defined");
}
// Create an async function to fetch courses from Supabase
// Create an async function to fetch courses from Supabase
export const fetchCourses = async () => {
  const { data, error } = await supabase
    .from("course")
    .insert([
      {
        coursename: "Sample Course Title",
        university: "RMIT",
        description: "This is a sample course description.",
      },
    ])
    .select(); 

  if (error) {
    console.error("Error inserting course:", error);
    alert("Error: " + error.message); 
    console.log("Inserted course:", data);
  }
};


// Call the fetchCourses function

