//region imports
const { Router } = require("express");
const routes = Router();
const {
  loginController,
  registerController,
} = require("../controllers/AuthController");
//end region imports

//region routes-auth
routes.post("/login", loginController);
routes.post("/register", registerController);
//end routes-auth

module.exports = routes;
