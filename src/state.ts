import { atom } from "jotai";
// import { IMessage } from "./components/chat/types";
import type { User } from "firebase/auth"


export enum Role {
  user = "User",
  assistant = "Assistant",
}



export interface ICourse {
    id: number;
    coursename: string,
    university: string,
    description: string,
}



export interface IUserInfo {
  name: string;
  email: string;
  avatar: string;
  courses: ICourse[];
}





export const selectedCourseAtom = atom<string>("")


export const userInfoAtom = atom<IUserInfo | null>(null);
export const activeAdminTabAtom = atom<"courses" | "upload">("courses");
export const authUserAtom = atom<User | null>(null)
export const authTokenAtom = atom<string | null>(null)

// For selected course
export const selectedUploadCourseAtom = atom<string>("")

// Uploaded PDF files
export const uploadedFilesAtom = atom<File[]>([])

// Upload status: "idle" | "success" | "error"
export const uploadStatusAtom = atom<"idle" | "success" | "error">("idle")

