import  CourseAdminPortal  from "@/components/CourseAdminPortal"


export default function App() {
  return <CourseAdminPortal />;
}

// import { useState } from "react"
// import type { User } from "firebase/auth"
// import LoginForm from "./components/LoginScreen"

// export default function App() {
//   const [authUser, setAuthUser] = useState<User | null>(null)
//   const [authToken, setAuthToken] = useState<string | null>(null)

//   return (
//     <LoginForm setAuthUser={setAuthUser} setAuthToken={setAuthToken} />
//   )
// }

// import SignupForm from "./components/SignupScreen";

// export default function App() {
//   return (
//       <SignupForm />
//   )
// }
