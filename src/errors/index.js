const CustomAPIError = require('./CustomAPIError');
const UnauthenticatedError = require('./unauthenticatedError');
const NotFoundError = require('./notFoundError');
const BadRequestError = require('./badRequestError');
const UnauthorizedError = require('./unauthorizedError');

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
};