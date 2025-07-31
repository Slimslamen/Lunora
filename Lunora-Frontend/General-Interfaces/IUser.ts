export interface IUser {
  email: string;
  name: string;
  birth: string;
  height: number;
  weight: number;
  obstacle: string;
  goal: string;
  period: string;
  birthControl: string;
  energy: string;
  workoutFrequency: number;
  referral: string;
  howFound: string;
  paidPlan: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserProgress {
  user_id: string;
  weight?: number;
  workoutExercise_id: string;
  createdAt: string;
  updatedAt: string;
}
