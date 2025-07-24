import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a
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
      firstTime: a.boolean(),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  Challenge: a
    .model({
      name: a.string(),
      description: a.string(),
      icon: a.string(),
      iconSet: a.string(),
      progress: a.integer(),
      rewardIcon: a.string(),
      rewardSet: a.string(),
      createdAt: a.string(),
      updatedAt: a.string(),
      active: a.boolean()
    })
    .authorization((allow) => [allow.guest()]),

  CompletedChallenge: a
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
      createdAt: a.string(),
      updatedAt: a.string(),
      active: a.boolean()
    })
    .authorization((allow) => [allow.guest()]),

  Exercise: a
    .model({
      exercise_id: a.string(),
      name: a.string(),
      description: a.string(),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  PeriodFact: a
    .model({
      fact: a.string(),
      phase: a.string(),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),

  Workout: a
    .model({
      name: a.string(),
      goal: a.string(),
      phase: a.string(),
      duration: a.integer(),
      calories: a.string(),
      intensity: a.string(),
      type: a.string(),
      muscles: a.string().array(),
      exercises: a.string().array(),
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

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
