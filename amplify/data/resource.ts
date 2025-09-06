import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Users: a
    .model({
      email: a.string(),
      name: a.string(),
      birth: a.string(),
      height: a.float(),
      weight: a.float(),
      obstacle: a.string(),
      trainingMethod: a.string(),
      goal: a.string(),
      cycle: a.string(),
      birthControl: a.string(),
      energy: a.string(),
      workoutFrequency: a.integer(),
      referral: a.string(),
      howFound: a.string(),
      paidPlan: a.string(),
      userWorkoutExercises: a.hasMany("UserWorkoutExercises", "user_id"),
      userWorkoutLogs: a.hasMany("UserWorkoutLog", "user_id"),
      userWeeklyWorkouts: a.hasMany("WeeklyUserWorkouts", "user_id"),
      userChallenges: a.hasMany("UserChallenges", "user_id"),
      userLevel: a.string(),
      experience: a.integer(),
      daysActive: a.integer(),
      daysStreak: a.integer(),
      lastWorkoutDate: a.string(),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  UserWorkoutExercises: a
    .model({
      user_id: a.string().required(),
      user: a.belongsTo("Users", "user_id"),
      workout_id: a.string().required(),
      workout: a.belongsTo("Workouts", "workout_id"),
      exercise_id: a.string().required(),
      exercise: a.belongsTo("Exercises", "exercise_id"),
      weight: a.integer(),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  UserWorkoutLog: a
    .model({
      user_id: a.string().required(),
      user: a.belongsTo("Users", "user_id"),
      workout_id: a.string().required(),
      workout: a.belongsTo("Workouts", "workout_id"),
      date: a.string(),
      completed: a.boolean(),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  WeeklyUserWorkouts: a
    .model({
      user_id: a.string().required(),
      user: a.belongsTo("Users", "user_id"),
      workout_id: a.string().required(),
      workout: a.belongsTo("Workouts", "workout_id"),
      week: a.integer(),
      year: a.integer(),
      scheduledDate: a.string(), // YYYY-MM-DD format for specific date
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  UserChallenges: a
    .model({
      user_id: a.string().required(),
      user: a.belongsTo("Users", "user_id"),
      challenge_id: a.string().required(),
      challenge: a.belongsTo("Challenges", "challenge_id"),
      completed: a.boolean(),
      completedAt: a.string(),
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
      userWorkoutExercises: a.hasMany("UserWorkoutExercises", "exercise_id"),
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
      exercises: a.hasMany("WorkoutExercises", "workout_id"),
      userWorkoutExercises: a.hasMany("UserWorkoutExercises", "workout_id"),
      userWorkoutLogs: a.hasMany("UserWorkoutLog", "workout_id"),
      weeklyUserWorkouts: a.hasMany("WeeklyUserWorkouts", "workout_id"),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  Challenges: a
    .model({
      id: a.string().required(),
      name: a.string(),
      description: a.string(),
      longDescription: a.string(),
      icon: a.string(),
      iconSet: a.string(),
      progress: a.integer(),
      rewardIcon: a.string(),
      rewardSet: a.string(),
      exp: a.integer(),
      active: a.boolean(),
      coming: a.boolean(),
      type: a.string(),
      location: a.string(),
      userChallenges: a.hasMany("UserChallenges", "challenge_id"),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  CycleFacts: a
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
