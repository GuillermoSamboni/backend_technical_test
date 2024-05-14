const UserSchema = require("../models/UserModel");
const RoleSchema = require("../models/RoleModel");
const { validateEmail } = require("./validations/ValidationsAuth");
const { comparePasswords } = require("../helpers/BcryptHashedHelper");
const handleValidationErrors = require("../middleware/HandleValidationErrors");
const jwt = require("jsonwebtoken");

const {
  successResponse,
  errorResponse,
} = require("../middleware/StructureResponse");

async function login(email, password) {
  try {
    validateEmail(email);

    const userFinded = await UserSchema.findOne({ email }).populate("role");

    if (!userFinded) {
      return errorResponse(404, "Not found", { error: "User not exists" });
    }

    const passMatches = await comparePasswords(password, userFinded.password);
    if (!passMatches) {
      return errorResponse(401, "Credentials invalid", {
        error: "Email or password invalid",
      });
    }

    const token = jwt.sign(
      { id: userFinded._id },
      process.env.SECRET_API || "dev-secret",
      {
        expiresIn: 86400,
      }
    );
    return successResponse(200, "Login successful", 1, {
      user: userFinded,
      token: token,
    });
  } catch (error) {
    return errorResponse(400, "Validation Error", error.message);
  }
}

/**
 * This function registers a new user, returning two cases: success or error.
 * @returns success: when data is valid
 * @returns error: when data is no valid or duplicated data
 */
async function register(data) {
  try {
    const { password, confirmPassword, role } = data;

    if (!password || !confirmPassword)
      throw new Error("Both password and confirm password are required");

    if (password !== confirmPassword) throw new Error("Passwords do not match");

    const newUser = new UserSchema(data);

    if (role) {
      const foundRole = await RoleSchema.findOne({ name_role: role });
      if (foundRole) {
        newUser.role = foundRole._id;
      } else {
        throw new Error(`Role '${role}' not found`);
      }
    } else {
      const defaultRole = await RoleSchema.findOne({ name_role: "user" });
      if (defaultRole) {
        newUser.role = defaultRole._id;
      } else {
        throw new Error("Default role 'user' not found");
      }
    }

    const resultRegister = await newUser.save();
    return successResponse(201, "Success", 1, resultRegister);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
}

module.exports = { login, register };
