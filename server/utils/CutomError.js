class Errorhandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

    Error.captureStackTrace(this, this.constructior);
  }
}

export default Errorhandler;
