// src/aws-config.js
import AWS from 'aws-sdk';
// Update the AWS config
AWS.config.update({
  region: 'us-east-1', // Replace with your region
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:da8678e2-4239-4e3e-8d5e-e62a8d8a6900', // Replace with your Cognito Identity Pool ID
  }),
});

// Initialize the Lex Runtime V2 client
const lexRuntimeV2 = new AWS.LexRuntimeV2();

export default lexRuntimeV2;