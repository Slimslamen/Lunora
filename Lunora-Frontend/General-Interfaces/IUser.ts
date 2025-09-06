export interface IUser {
  id: string;
  email: string;
  name: string;
  birth: string;
  height: number;
  weight: number;
  obstacle: string;
  trainingMethod: string;
  goal: string;
  cycle: string;
  birthControl: string;
  energy: string;
  workoutFrequency: number;
  referral: string;
  howFound: string;
  paidPlan: string;
  userLevel: string;
  experience: number;
  daysActive: number;
  daysStreak: number;
  lastWorkoutDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserWorkoutExercises {
  user_id: string;
  weight?: number;
  workout_id: string;
  exercise_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserWorkoutLog {
  user_id: string;
  workout_id: string;
  date: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IWeeklyUserWorkouts {
  user_id: string;
  workout_id: string;
  week: number;
  year: number;
  scheduledDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserChallenges {
  user_id: string;
  challenge_id: string;
  completed: boolean;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
}
