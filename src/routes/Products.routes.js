const { Router } = require("express");
const routes = Router();

const {
  getAllProductsController,
  registerProductController,
  findProductByIdController,
  deleteProductByIdController,
  updateProductByIdController,
} = require("../controllers/ProductsController");

const { verifyToken } = require("../middleware/AuthJwt");

//! general routes
routes.get("/all", getAllProductsController);
routes.get("/find/:id", findProductByIdController);
routes.post("/register", verifyToken, registerProductController);
routes.delete("/delete/:id", verifyToken, deleteProductByIdController);
routes.patch("/update/:id", verifyToken, updateProductByIdController);
//! end general routes

module.exports = routes;
