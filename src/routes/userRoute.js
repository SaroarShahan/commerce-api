const express = require('express');

const router = express.Router();
const { getAllUsers, getUser, updateUser } = require('../controllers/userController');

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser);

module.exports = router;
