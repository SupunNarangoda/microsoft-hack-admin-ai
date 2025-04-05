import { atom } from "jotai";
// import { IMessage } from "./components/chat/types";
import type { User } from "firebase/auth"


export enum Role {
  user = "User",
  assistant = "Assistant",
}

interface IChatInfo {
  id: number;
  name: string;
  // messages: IMessage[];
}

interface ICourse {
  id: number;
  name: string;
}

interface IChatHistoryChat extends Omit<IChatInfo, "messages"> {
  lastRole: Role;
  lastMessage: string;
}

interface IUserInfo {
  id: number;
  name: string;
  email: string;
  avatar: string;
  courses: ICourse[];
  chatHistory: IChatHistoryChat[];
}

const sampleChatHistory: IChatHistoryChat[] = [
  {
    id: 1,
    name: "Assignment Help",
    lastRole: Role.user,
    lastMessage: "Can you explain the assignment requirements?",
  },
  {
    id: 1,
    name: "Project Questions",
    lastRole: Role.assistant,
    lastMessage: "Sure! What do you need help with?",
  },
  {
    id: 3,
    name: "Exam Preparation",
    lastRole: Role.user,
    lastMessage: "What topics should I focus on for the exam?",
  },
];

const sampleCourses: ICourse[] = [
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Physics" },
    { id: 3, name: "Chemistry" },
    { id: 4, name: "Biology" },
]

const sampleUserInfo: IUserInfo = {
    id: 1,
    name: "John Doe",
    email: "john.doe@gmail.com",
    avatar: "string",
    courses: sampleCourses,
    chatHistory: sampleChatHistory,
};

export const selectedCourseAtom = atom<string>("")

export const chatInfoAtom = atom<IChatInfo | null>(null);
// export const messagesAtom = atom<IMessage[]>([]);
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

