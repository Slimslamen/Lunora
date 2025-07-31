import React, { useState, ReactNode } from "react";
import { WorkoutContext } from "./WorkoutContext";


interface WorkoutProviderProps {
    children: ReactNode;
}

export const WorkoutProvider: React.FC<WorkoutProviderProps> = ({ children }) => {

    const [viewMode, setviewMode] = useState(false)

    return (
        <WorkoutContext.Provider value={{ setviewMode, viewMode }}>
            {children}
        </WorkoutContext.Provider>
    );
};