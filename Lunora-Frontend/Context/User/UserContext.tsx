import { createContext } from "react";



interface UserContextType {
    loadedUser: boolean
}

export const UserContext = createContext<UserContextType>({
    loadedUser: false
});