export interface IWorkout {
  id: string;
  name: string;
  goal: string;
  phase: string;
  duration: number;
  calories: string;
  intensity: string;
  type: string;
  muscles: string[];
  exercises: IWorkoutExercises[];
  createdAt: string;
  updatedAt: string;
}

export interface IWorkoutExercises {
  exercise_id: string;
  name: string;
  sets: number;
  reps: string;
  phase: string;
  time?: string;
  workout_id: string;
  createdAt: string;
  updatedAt: string;
}
export interface IExercise {
  exercise_id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
