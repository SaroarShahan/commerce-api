const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { authenticateUser } = require('../middleware/authenticateUser');

const router = express.Router();

router.route('/').get(getAllProducts).post([authenticateUser], createProduct);
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
