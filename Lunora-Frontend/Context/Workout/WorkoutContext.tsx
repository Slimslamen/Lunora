import { createContext } from "react";

interface WorkoutContextType {
  viewMode: boolean;
  setviewMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const WorkoutContext = createContext<WorkoutContextType>({
  viewMode: false,
  setviewMode: () => {},
});