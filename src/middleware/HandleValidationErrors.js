const handleValidationErrors = (error) => {
  if (error.name === "ValidationError") {
    const validationErrors = Object.values(error.errors).map((e) => e.message);
    return validationErrors;
  } else {
    return [error.message];
  }
};

module.exports = handleValidationErrors;
