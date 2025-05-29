import { defineFunction } from "@aws-amplify/backend";
    
export const functions = defineFunction({
  name: "my-first-function",
  entry: "./handler.ts"
});