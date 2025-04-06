// // // src/routes/routes.tsx
import { Routes, Route, Navigate } from "react-router-dom"
import CourseAdminPortal from "@/components/CourseAdminPortal"
import LoginForm from "@/components/LoginScreen"

export const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" /> } />
      <Route path="/admin" element={<CourseAdminPortal />} />
      {/* <Route path="/signup" element={<SignupForm />} />  */}
      <Route path="/login" element={<LoginForm />} />
      {/* <Route path="/logout" element={<Logout />} /> */}
    </Routes>
  )
}


