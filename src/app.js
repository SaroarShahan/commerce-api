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

// middleware
const notFoundMiddleware = require('./middleware/notFoundMiddleware');

app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);

app.use(notFoundMiddleware);

app.listen(_PORT, () => {
  console.log(`Server is running at ${process.env.HOST}:${_PORT}`);
});
