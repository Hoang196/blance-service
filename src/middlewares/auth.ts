import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import logger from 'logger';
import { cognitoExpress } from 'resources/cognito';
import { TokenExpiredException, UserNotAuthorizedException, ApiKeyNotAuthorizedException } from 'exceptions';
import config from 'config';
import { SecretModel } from 'models';
import * as aes from 'utils/aes';
import * as base64 from 'utils/base64';

const adminAuthMiddleware = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  if (request.headers && request.headers.authorization) {
    const tokenArray = request.headers.authorization.split(' ');
    const idToken = tokenArray[1];
    cognitoExpress.validate(idToken, (err: any, validationResponse: any) => {
      if (err) {
        // API is not authenticated, do something with the error.
        logger.warn(`Admin token not valid:${JSON.stringify(err)}`);
        if (err.name === 'TokenExpiredError') {
          // Throw specific error so that UI can refresh the token
          next(new TokenExpiredException());
        } else {
          next(new UserNotAuthorizedException());
        }
      } else {
        // Else API has been authenticated. Proceed.
        logger.info(`Admin token is valid:${JSON.stringify(validationResponse)}`);
        request.userId = validationResponse?.email;
        next();
      }
    });
  } else {
    logger.warn(`Admin token not present`);
    next(new UserNotAuthorizedException());
  }
};

const instantWinGameAuthMiddleware = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const soNumber = request.params.soNumber;
  const token = request.headers.authorization;
  if (!token) {
    next(new UserNotAuthorizedException());
    return;
  }
  const aesToken = base64.decode(token);
  const tokenMessage = aes.decrypt(aesToken);
  if (soNumber !== tokenMessage) {
    const secret = await SecretModel.findOne({ id: soNumber });
    if (secret?.secret !== token) {
      next(new UserNotAuthorizedException());
    }
  } else {
    next();
  }
};

const apiKeyAuthMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (!req.headers || !req.headers['x-api-key']) {
    logger.warn('Request without API Key');
    next(new ApiKeyNotAuthorizedException());
  }
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== config.internalApiKey) {
    logger.warn(`Api Key is invalid: ${apiKey}`);
    next(new ApiKeyNotAuthorizedException());
  }

  logger.info(`Api Key is valid :${apiKey}`);
  next();
};

export { adminAuthMiddleware, instantWinGameAuthMiddleware, apiKeyAuthMiddleware };
