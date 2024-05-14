const jwt = require("jsonwebtoken");
const UserSchema = require("../models/UserModel");
const {
  errorResponse,
  successResponse,
} = require("../middleware/StructureResponse");

async function verifyToken(req, res, next) {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      const response = errorResponse(
        403,
        "No token provided",
        "The token is required"
      );
      return res.status(403).json(response);
    }
    const decoded = jwt.verify(token, process.env.SECRET_API || "dev-secret");
    const userFound = await UserSchema.findById(decoded.id, {
      password: 0,
    }).populate("role");
    if (!userFound) {
      const response = errorResponse(404, "Not found", "User not found");
      return res.status(404).json(response);
    }
   
    const {name_role} = userFound.role
    if(name_role==='admin'){
      next();
    }else{
      const response = errorResponse(
        403,
        "Not authorized",
        "You do not have access to this functionality"
      );
      return res.status(400).json(response);
    }
  } catch (error) {
    if (error.message === "jwt malformed") {
      const response = errorResponse(
        400,
        "Bad request",
        "The token provided is malformated"
      );
      return res.status(400).json(response);
    }
  }
}

module.exports = { verifyToken };
