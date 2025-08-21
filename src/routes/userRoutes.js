// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    // Create a unique filename to avoid conflicts
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Define API Endpoints
router.post('/register', upload.single('profilePicture'), userController.registerUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', upload.single('profilePicture'), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
