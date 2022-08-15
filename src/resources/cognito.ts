import config from 'config';

const CognitoExpress = require('cognito-express');

export const cognitoExpress = new CognitoExpress({
//   region: config.aws.region,
//   cognitoUserPoolId: config.aws.cognitoUserPoolId,
  tokenUse: 'id', // Possible Values: access | id
  tokenExpiration: 3600000, // Up to default expiration of 1 hour (3600000 ms)
});
