import { IUser, IUserWorkoutExercises } from "@/General-Interfaces/IUser";
import { createContext } from "react";

interface UserContextType {
    loadedUser: boolean
    userWorkoutExercises: IUserWorkoutExercises,
    activeUser: IUser | undefined
}

export const UserContext = createContext<UserContextType>({
    loadedUser: false,
    userWorkoutExercises: {
        user_id: "",
        weight: 0,
        workout_id: "",
        exercise_id: "",
        createdAt: "",
        updatedAt: ""
    },
    activeUser: {
        id: "",
        email: "",
        name: "",
        birth: "",
        height: 0,
        weight: 0,
        obstacle: "",
        trainingMethod: "",
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