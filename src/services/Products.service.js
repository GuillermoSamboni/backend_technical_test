const ProductSchema = require("../models/ProductModel");
const {
  successResponse,
  errorResponse,
} = require("../middleware/StructureResponse");

const handleValidationErrors = require("../middleware/HandleValidationErrors");
const { default: mongoose } = require("mongoose");

const getAllProducts = async () => {
  try {
    const products = await ProductSchema.find();
    return successResponse(200, "Success", products.length, products);
  } catch (error) {
    return errorResponse(500, "Internal Server Error", error);
  }
};
const registerProduct = async (data) => {
  try {
    const newProduct = new ProductSchema(data);
    const resultRegister = await newProduct.save();
    return successResponse(201, "Success", 1, resultRegister);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
};

const findProductById = async (id) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid Id provided",
      });
    }

    const queryProduct = await ProductSchema.findById(id);
    if (!queryProduct) {
      return successResponse(404, "Not found", 0);
    }
    return successResponse(200, "Success", 1, queryProduct);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(400, "Validation Error", validationErrors);
  }
};

const deleteProductById = async (id) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(400, "Bad request", {
        error: "Invalid id provided",
      });
    }
    const queryProduct = await ProductSchema.findByIdAndDelete(id);

    if (!queryProduct) {
      return errorResponse(404, "Not found", { error: "Product not found" });
    }

    return successResponse(200, "Success", 1, []);

  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(500, "Validation Error", validationErrors);
  }
};

const updateProductById = async (id, update) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(
        "Invalid Product ID. Please provide a valid 24-character ObjectId."
      );
    }

    const resultUpdated = await ProductSchema.findOneAndUpdate(
      { _id: id },
      update,
      { new: true }
    );

    if (!resultUpdated) {
      return errorResponse((statusCode = 404), (message = "Product not found"));
    }

    return successResponse(200, "Success", 1, resultUpdated);
  } catch (error) {
    const validationErrors = handleValidationErrors(error);
    return errorResponse(
      validationErrors ? 400 : 500,
      validationErrors ? "Validation Error" : "Internal Server Error",
      validationErrors
    );
  }
};

module.exports = {
  getAllProducts,
  registerProduct,
  findProductById,
  deleteProductById,
  updateProductById,
};
