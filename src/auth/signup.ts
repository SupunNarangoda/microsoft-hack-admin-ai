import { createUserWithEmailAndPassword, updateProfile, User } from "firebase/auth";
import { auth } from "./config/config.ts";


export const signUpUser = async (email: string, password: string, displayName?: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user: User = userCredential.user;

    // Update user profile with display name if provided
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    return { user };
  } catch (error: any) {
    return { error: error.message };
  }
};
