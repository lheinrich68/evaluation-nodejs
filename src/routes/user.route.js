const express = require('express');
const userController = require('../controllers/user.controller.js');
const { authMiddleware } = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.get('/', authMiddleware, userController.fetchAllUsers);
router.get('/:id', authMiddleware, userController.fetchOneUser);

module.exports = router;