import React, { useState, ReactNode, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { IUser, IUserProgress } from "@/General-Interfaces/IUser";

interface UserProviderProps {
  children: ReactNode;
}
const client = generateClient<Schema>();

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [loadedUser, setLoadedUser] = useState(false);
  const [activeUser, setactiveUser] = useState<IUser>()
  const [userProgress, setuserProgress] = useState<IUserProgress>({
    user_id: "",
    weight: 0,
    workoutExercise_id: "",
    createdAt: "",
    updatedAt: ""
  })

  useEffect(() => {
    const fetchUser = async () => {
      const [
        { data: Users, errors: userErrors },
        { data: Challenges, errors: challengeErrors },
        { data: Workouts, errors: workoutsErrors },
        { data: PeriodFacts, errors: periodFactsErrors },
      ] = await Promise.all([
        client.models.Users.list({}),
        client.models.Challenges.list({}),
        client.models.Workouts.list({}),
        client.models.PeriodFacts.list({}),
      ]);
      const errors = userErrors;
      setLoadedUser(false);
      if (errors) {
        console.error(errors);
        return;
      }
      if (Users) {
        setLoadedUser(true);
        const U = Users.filter(u => u.name === "Jimmy")
        if (U) {
          setactiveUser(U[0] as IUser)
        }
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUserWorkoutSpecifics = async () => {
      const { data: fetchedUserWorkout, errors } = await client.models.UserWorkoutExercises.list({ });
      if (errors) {
        console.error(errors);
        return;
      }
      if (fetchedUserWorkout) {
        const selectedUserWorkout = fetchedUserWorkout.find(u => u.user_id === "user_1")
        if (selectedUserWorkout) {
          setuserProgress(selectedUserWorkout as IUserProgress)
        }
      }
    };

    fetchUserWorkoutSpecifics();
  }, []);
  return <UserContext.Provider value={{ loadedUser, userProgress, activeUser }}>{children}</UserContext.Provider>;
};
