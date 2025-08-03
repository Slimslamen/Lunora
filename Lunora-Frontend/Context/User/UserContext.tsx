import { IUser, IUserProgress } from "@/General-Interfaces/IUser";
import { createContext } from "react";

interface UserContextType {
    loadedUser: boolean
    userProgress: IUserProgress,
    activeUser: IUser | undefined
}

export const UserContext = createContext<UserContextType>({
    loadedUser: false,
    userProgress: {
        user_id: "",
        weight: 0,
        workoutExercise_id: "",
        exercise_id: "",
        createdAt: "",
        updatedAt: ""
    },
    activeUser: {
        email: "",
        name: "",
        birth: "",
        height: 0,
        weight: 0,
        obstacle: "",
        goal: "",
        period: "",
        birthControl: "",
        energy: "",
        workoutFrequency: 0,
        referral: "",
        howFound: "",
        paidPlan: "",
        userLevel:"",
        experience: 0,
        daysActive: 0,
        daysStreak: 0,
        lastWorkoutDate: "",
        createdAt: "",
        updatedAt: "",
    }
});