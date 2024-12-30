const catchAsync = require('../middleware/catchAsync');
const product = require('../db/models/product');

exports.createProduct = catchAsync(async (req, res) => {
  const {
    title,
    productImage,
    price,
    shortDescription,
    description,
    productUrl,
    category,
    tags,
    createdBy,
  } = req.body;

  const newProduct = await product.create({
    title,
    productImage,
    price,
    shortDescription,
    description,
    productUrl,
    category,
    tags,
    createdBy,
  });

  res.status(201).json({
    status: true,
    message: 'Product created successfully',
    data: newProduct,
  });
});

exports.getAllProducts = catchAsync(async (_, res) => {
  const products = await product.findAll();

  res.status(200).json({
    status: true,
    message: 'All products',
    data: {
      products,
      meta: {
        total: products.length,
      },
    },
  });
});

exports.getProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const productData = await product.findByPk(id);

  if (!productData) {
    return res.status(404).json({
      status: false,
      message: 'Product not found',
    });
  }

  res.status(200).json({
    status: true,
    message: 'Product found',
    data: {
      product: productData,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    isFeatured,
    productImage,
    price,
    shortDescription,
    description,
    productUrl,
    category,
    tags,
  } = req.body;

  const productData = await product.findByPk(id);

  if (!productData) {
    return res.status(404).json({
      status: false,
      message: 'Product not found',
    });
  }

  await product.update(
    {
      title,
      isFeatured,
      productImage,
      price,
      shortDescription,
      description,
      productUrl,
      category,
      tags,
    },
    {
      where: {
        id,
      },
    },
  );

  res.status(200).json({
    status: true,
    message: 'Product updated successfully',
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const productData = await product.findByPk(id);

  if (!productData) {
    return res.status(404).json({
      status: false,
      message: 'Product not found',
    });
  }

  await product.destroy({
    where: {
      id,
    },
  });

  res.status(204).json({
    status: true,
    message: 'Product deleted successfully',
  });
});
