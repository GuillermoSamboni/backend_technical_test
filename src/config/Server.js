//region imports
const express = require("express");
const server = express();
const morgan = require("morgan");
const port = process.env.PORT || 3000;
const createRole = require("../libs/initialSetup");
createRole();
//end region imports

//region config dependences
server.use(morgan("dev"));
server.use(express.json());
//end region dependences

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