const catchAsync = require('../middleware/catchAsync');
const Product = require('../db/models/product');
const User = require('../db/models/user');

exports.createProduct = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { title, productImage, price, shortDescription, description, productUrl, category, tags } =
    req.body;

  const newProduct = await Product.create({
    title,
    productImage,
    price,
    shortDescription,
    description,
    productUrl,
    category,
    tags,
    createdBy: userId,
  });

  res.status(201).json({
    status: true,
    message: 'Product created successfully',
    data: newProduct,
  });
});

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.findAll({
    include: {
      model: User,
      attributes: {
        exclude: ['password', 'deletedAt'],
      },
    },
  });

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

exports.getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByPk(id, { include: User });

  if (!product) {
    return next(new Error('Product not found'), 404);
  }

  res.status(200).json({
    status: true,
    message: 'Product found',
    data: {
      product,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, productImage, price, shortDescription, description, productUrl, category, tags } =
    req.body;

  const product = await Product.findOne({ where: { id, createdBy: req.user.id } });

  if (!product) {
    return next(new Error('Product not found'), 404);
  }

  product.title = title;
  product.productImage = productImage;
  product.price = price;
  product.shortDescription = shortDescription;
  product.description = description;
  product.productUrl = productUrl;
  product.category = category;
  product.tags = tags;

  const updatedProduct = await product.save();

  res.status(200).json({
    status: true,
    message: 'Product updated successfully',
    data: {
      product: updatedProduct,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id, createdBy: req.user.id } });

  if (!product) {
    return next(new Error('Product not found'), 404);
  }

  await product.destroy();

  res.status(200).json({
    status: true,
    message: 'Product deleted successfully',
  });
});
