//region imports
const cors = require("cors");
const express = require("express");
const server = express();
const routes = express.Router();

const morgan = require("morgan");
const port = process.env.PORT || 3000;
const createRole = require("../libs/initialSetup");
createRole();
//end region imports

//region config dependences
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
//end region dependences

//region default-routes
const path = require("path");
const defaultRoute = routes.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});
server.use(defaultRoute);
//end region default-routes

//region products-routes
const routeUsers = require("../routes/Products.routes");
server.use("/api/v1/products", routeUsers);
//end region products-routes

//region auth-routes
const authRoutes = require("../routes/Auth.routes");
server.use("/api/v1/auth", authRoutes);
//end region auth-routes

server.listen(port, () => {
  console.log(
    `Run server in port ${port} \nrun local : http://localhost:${port}`
  );
});

module.exports = server;
