class GeneralError extends Error {
  constructor(err, message) {
    super();
    this.message = message ? message: err.message;
    this.stack = err.stack
  }

  getStatusCode() {
    if (this instanceof BadRequest) return 400;
    if (this instanceof NotFound) return 404;
    if (this instanceof InternalError) return 500;
    return 500;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class InternalError extends GeneralError {}

const errorHandler = (err, req, res, next) => {
  res.render('error', {error: err.message})
  // if (err instanceof GeneralError) {
  //   return res.status(err.getStatusCode()).json({
  //     status: 'error',
  //     message: err.message,
  //   });
  // }

  // return res.status(500).json({
  //   status: 'error',
  //   message: err.message,
  // });
};

module.exports = {
  errorHandler,
  errorTypes: {
    GeneralError,
    BadRequest,
    NotFound,
    InternalError
  },
};
