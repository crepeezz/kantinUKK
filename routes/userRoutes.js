const express = require('express');
const app = express();
const userControllers = require('../control/control-user');
const auth = require('../auth/auth');

app.post('/register', userControllers.registerUser);
app.post('/login', userControllers.loginUser);
app.put('/update-profile', auth.authVerify, userControllers.updateProfile);
app.get('/customers', auth.authVerify, userControllers.getCustomers);
app.post('/customers', auth.authVerify, userControllers.addCustomer);
app.put('/customers/:id', auth.authVerify, userControllers.updateCustomer);
app.delete('/customers/:id', auth.authVerify, userControllers.deleteCustomer);

module.exports = app;