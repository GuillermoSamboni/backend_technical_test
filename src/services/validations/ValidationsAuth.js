const validateEmail = (email) => {
  if (!email || !email.trim()) {
    throw new Error("Email is required.");
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format.");
  }
};

const validatePassword = (password) => {
  if (!password || !password.trim()) {
    throw new Error("Password is required.");
  }

  if (password.length <= 7) { 
    throw new Error("The password must contain a minimum of 8 characters.");
  }
};


module.exports = { validateEmail, validatePassword };
