export enum HttpErrorCode {
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  UNAUTHENTICATED = 401,
  FORBIDDEN = 403,
}

export default class HttpException extends Error {
  code: HttpErrorCode;
  constructor(message: string, code: HttpErrorCode) {
    super(message);
    this.code = code;
  }
}

export function HandleError(error: any) {
  if (error instanceof HttpException) {
    throw error;
  } else {
    throw new HttpException(
      "Server Error",
      HttpErrorCode.INTERNAL_SERVER_ERROR
    );
  }
}
