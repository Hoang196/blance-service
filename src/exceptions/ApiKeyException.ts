import HttpException from './HttpException';
import { ErrorCodes } from './errorCode';

/**
 * This exception can use used in case an api key from internal service is not authorized to perform an action.
 */
class ApiKeyNotAuthorizedException extends HttpException {
  constructor() {
    const errorDetail = ErrorCodes.API_KEY_UNAUTHORIZED;
    super(401, errorDetail.MESSAGE, errorDetail.CODE);
  }
}

export default ApiKeyNotAuthorizedException;
