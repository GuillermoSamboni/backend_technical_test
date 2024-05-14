const successResponse = (statusCode, message, count = 0, data = []) => {
  return {
    statusCode,
    message,
    totalResults: count,
    data,
  };
};

const errorResponse = (statusCode, message, errors) => {
  return {
    statusCode,
    message,
    errors
  };
};

module.exports = { successResponse, errorResponse };
