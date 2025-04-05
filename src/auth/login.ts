import { signInWithEmailAndPassword, User } from "firebase/auth"
import { auth } from "./config/config"

export const loginUser = async (
  email: string,
  password: string,
  setAuthUser: (user: User | null) => void,
  setAuthToken: (token: string | null) => void
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user: User = userCredential.user
    const token = await user.getIdToken()

    localStorage.setItem("authToken", token)

    // Set atoms
    setAuthUser(user)
    setAuthToken(token)

    return { user, token }
  } catch (error: any) {
    return { error: error.message }
  }
}
