// import  CourseAdminPortal  from "@/components/CourseAdminPortal"


// export default function App() {
//   return <CourseAdminPortal />;
// }

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


// import { BrowserRouter as Router } from "react-router-dom"
// import AppRoutes from "@/routes/router"

// export default function App() {
//   return (
//     <Router>
//       <AppRoutes />
//     </Router>
//   )
// }


// import { useEffect } from "react"
// import { useSetAtom } from "jotai"
// import { authUserAtom, authTokenAtom } from "@/state"
// import { getAuth, onAuthStateChanged } from "firebase/auth"
// import { BrowserRouter as Router } from "react-router-dom"
// import {AppRoutes} from "@/routes/router"


// export default function App() {
//   const setAuthUser = useSetAtom(authUserAtom)
//   const setAuthToken = useSetAtom(authTokenAtom)
//   // Fetch courses on app load
//   useEffect(() => {
//     const auth = getAuth()
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const token = await user.getIdToken()
//         setAuthUser(user)
//         setAuthToken(token)
//       } else {
//         setAuthUser(null)
//         setAuthToken(null)
//       }
//     })

//     return () => unsubscribe()
//   }, [setAuthUser, setAuthToken])

//   return (
//     <Router>
//       <AppRoutes />
//     </Router>
//   )
// }


import { useEffect } from "react";
import "./App.css";
import { fetchUserInfo } from "@/api/user";
import { useAtom } from "jotai";
import { userInfoAtom } from "@/state";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LoginForm from "@/components/LoginScreen";
import Logout from "@/components/Logout";
import CourseAdminPortal from "@/components/CourseAdminPortal.tsx";




export default function App() {
  const [, setUserInfo] = useAtom(userInfoAtom);
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const result = await fetchUserInfo();
      const userInfo = result.success ? result.data : null;
      if (userInfo) {
        setUserInfo(userInfo);
      } else {
        navigate("/login");
      }
    })();
  }, []);

  return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<CourseAdminPortal />} />
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
  );
}