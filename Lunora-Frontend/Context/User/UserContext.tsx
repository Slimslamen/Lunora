import { IUserProgress } from "@/General-Interfaces/IUser";
import { createContext } from "react";



interface UserContextType {
    loadedUser: boolean
    userProgress: IUserProgress
}

export const UserContext = createContext<UserContextType>({
    loadedUser: false,
    userProgress: {
        user_id: "",
        weight: 0,
        workoutExercise_id: ""
    }
});