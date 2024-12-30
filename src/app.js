const express = require('express');
require('dotenv').config({ path: `${process.cwd()}/.env` });

const app = express();
const _PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Routes
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');

// middleware
const catchAsync = require('./middleware/catchAsync');
const { AppError, GlobalError } = require('./errors');

app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/products', productRoute);

app.use(
  '*',
  catchAsync(async (req) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  }),
);
app.use(GlobalError);

app.listen(_PORT, () => {
  console.log(`Server is running at ${process.env.HOST}:${_PORT}`);
});
