import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event : any, context : any) => {
  // your function code goes here
  return 'Hello, World!';
};