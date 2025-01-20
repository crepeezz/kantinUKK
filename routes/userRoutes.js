const express = require('express');
const app = express();
const userController = require('../controllers/userControllers');

// Route untuk registrasi user
app.post('/register', userController.registerUser);

// Route untuk login user
app.post('/login', userController.loginUser);

// Route untuk mendapatkan semua user
app.get('/', userController.getAllUsers);

// Route untuk memperbarui user
app.put('/:userID', userController.updateUser);

// Route untuk menghapus user
app.delete('/:userID', userController.deleteUser);

module.exports = router;
