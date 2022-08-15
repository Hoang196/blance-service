import HttpException from './HttpException';
import { ErrorCodes } from './errorCode';

/**
 * This exception can be used in case usage limit is exceeded
 * Only play X turns in Y days
 */
class UsageLimitException extends HttpException {
  constructor(waitingDays: number) {
    const errorDetail = ErrorCodes.USAGE_LIMIT;
    super(400, errorDetail.MESSAGE, errorDetail.CODE);
    this.response = {
      waitingDays,
    };
  }
}

export default UsageLimitException;
