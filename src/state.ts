import { atom } from "jotai";
// import { IMessage } from "./components/chat/types";
import type { User } from "firebase/auth"


export enum Role {
  user = "User",
  assistant = "Assistant",
}



interface ICourse {
  id: number,
    title: string,
    description: string,
    modules: number,
    students: number,
    lastUpdated: string,
    status:string,
}



interface IUserInfo {
  id: number;
  name: string;
  email: string;
  avatar: string;
  courses: ICourse[];
}


const sampleCourses: ICourse[] = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    modules: 12,
    students: 156,
    lastUpdated: "2023-04-15",
    status: "Published",
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    description: "Master advanced React concepts and patterns",
    modules: 8,
    students: 89,
    lastUpdated: "2023-05-22",
    status: "Draft",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    description: "Introduction to data analysis and visualization",
    modules: 15,
    students: 210,
    lastUpdated: "2023-03-10",
    status: "Published",
  },
  {
    id: 4,
    title: "Mobile App Development with Flutter",
    description: "Build cross-platform mobile applications",
    modules: 10,
    students: 124,
    lastUpdated: "2023-06-05",
    status: "Published",
  },
]

const sampleUserInfo: IUserInfo = {
    id: 1,
    name: "John Doe",
    email: "john.doe@gmail.com",
    avatar: "string",
    courses: sampleCourses,
};

export const selectedCourseAtom = atom<string>("")


export const userInfoAtom = atom<IUserInfo | null>(sampleUserInfo);
export const activeAdminTabAtom = atom<"courses" | "upload">("courses");
export const authUserAtom = atom<User | null>(null)
export const authTokenAtom = atom<string | null>(null)

// For selected course
export const selectedUploadCourseAtom = atom<string>("")

// Uploaded PDF files
export const uploadedFilesAtom = atom<File[]>([])

// Upload status: "idle" | "success" | "error"
export const uploadStatusAtom = atom<"idle" | "success" | "error">("idle")

