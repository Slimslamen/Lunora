import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Users: a
    .model({
      name: a.string(),
      birth: a.string(),
      height: a.float(),
      weight: a.float(),
      obstacle: a.string(),
      goal: a.string(),
      period: a.string(),
      birthControl: a.string(),
      energy: a.string(),
      workoutFrequency: a.integer(),
      referral: a.string(),
      howFound: a.string(),
      userWorkoutExercises: a.hasMany("UserWorkoutExercises", "user_id"),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  UserWorkoutExercises: a
    .model({
      user_id: a.string().required(),
      user: a.belongsTo("Users", "user_id"),
      workoutExercise_id: a.string().required(),
      workoutExercise: a.belongsTo("WorkoutExercises", "workoutExercise_id"),
      weight: a.integer(),    
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  WorkoutExercises: a
    .model({
      workout_id: a.string().required(),
      workouts: a.belongsTo("Workouts", "workout_id"),
      exercise_id: a.string().required(),
      exercise: a.belongsTo("Exercises", "exercise_id"),
      sets: a.integer(),
      reps: a.string(),
      phase: a.string(),
      time: a.string(),
      userWorkoutExercises: a.hasMany("UserWorkoutExercises", "workoutExercise_id"),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  Exercises: a
    .model({
      exercise_id: a.string(),
      name: a.string(),
      description: a.string(),
      workoutExercises: a.hasMany("WorkoutExercises", "exercise_id"),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  Workouts: a
    .model({
      id: a.string().required(),
      name: a.string(),
      goal: a.string(),
      phase: a.string(),
      duration: a.integer(),
      calories: a.string(),
      intensity: a.string(),
      type: a.string(),
      muscles: a.string().array(),
      exercises: a.hasMany("WorkoutExercises", "workout_id"),
      weight: a.integer(),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),
  Challenges: a
    .model({
      name: a.string(),
      description: a.string(),
      icon: a.string(),
      iconSet: a.string(),
      progress: a.integer(),
      rewardIcon: a.string(),
      rewardSet: a.string(),
      active: a.boolean(),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  CompletedChallenges: a
    .model({
      name: a.string(),
      description: a.string(),
      icon: a.string(),
      iconSet: a.string(),
      progress: a.integer(),
      rewardIcon: a.string(),
      rewardSet: a.string(),
      completed: a.boolean(),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  ComingChallenges: a
    .model({
      name: a.string(),
      description: a.string(),
      icon: a.string(),
      iconSet: a.string(),
      progress: a.integer(),
      rewardIcon: a.string(),
      rewardSet: a.string(),
      active: a.boolean(),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  PeriodFacts: a
    .model({
      id: a.string().required(),
      fact: a.string(),
      phase: a.string(),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "identityPool",
  },
});
