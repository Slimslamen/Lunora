import React, { useState, ReactNode, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { IUser } from "@/General-Interfaces/IUser";

interface UserProviderProps {
  children: ReactNode;
}
const client = generateClient<Schema>();

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

const [loadedUser, setLoadedUser] = useState(false)

useEffect(() => {
    const fetchUser = async () => {
    const [
        { data: Users, errors: userErrors }
        // { data: Challenges, errors: challengeErrors }, 
        // { data: ComingChallenges, errors: comingChallengeErrors },
        // { data: CompletedChallenges, errors: completedChallengeErrors },
        // { data: Workouts, errors: workoutsErrors },
        // { data: PeriodFacts, errors: periodFactsErrors }
        ] = await Promise.all([
        client.models.User.list({}),
        // client.models.Challenge.list({}),
        // client.models.ComingChallenges.list({}),
        // client.models.CompletedChallenge.list({}),
        // client.models.Workout.list({}),
        // client.models.PeriodFact.list({}),
    ]);
    const errors = userErrors;
        setLoadedUser(false)
    if (errors) {
        console.error(errors);
        return;
    }  
    if(Users) {
        setLoadedUser(true)
    }
    };
    fetchUser();
}, []);

  return <UserContext.Provider value={{loadedUser}}>{children}</UserContext.Provider>;
};
