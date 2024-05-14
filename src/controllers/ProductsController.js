const {
  getAllProducts,
  registerProduct,
  findProductById,
  deleteProductById,
  updateProductById,
} = require("../services/Products.service");

const getAllProductsController = async (req, res) => {
  try {
    const resultService = await getAllProducts();
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.statusCode(500).json({
      error: error.mesage,
    });
  }
};
const registerProductController = async (req, res) => {
  try {
    const resultService = await registerProduct(req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.mesage });
  }
};

const findProductByIdController = async (req, res) => {
  try {
    const resultService = await findProductById(req.params.id);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteProductByIdController = async (req, res) => {
  try {
    const resultService = await deleteProductById(req.params.id);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateProductByIdController = async (req, res) => {
  try {
    const resultService = await updateProductById(req.params.id, req.body);
    res.status(resultService.statusCode).json(resultService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProductsController,
  registerProductController,
  findProductByIdController,
  deleteProductByIdController,
  updateProductByIdController,
};
