const express = require('express');
const app = express();
const siswaControllers = require('../controllers/siswaControllers');
// const auth = require('../auth/auth');

app.post('/register', siswaControllers.registerSiswa);
app.post('/login', siswaControllers.loginSiswa);
app.put("/:id", siswaControllers.updateSiswa);
app.get("/:search", siswaControllers.getSiswa);
// app.get('/menu', siswaController.getMenu);           
// app.post('/order', auth.authVerify, siswaController.placeOrder); 
// app.get('/order-status', auth.authVerify, siswaController.getOrderStatus); 
// app.get('/order-history', auth.authVerify, siswaController.getOrderHistory); 
// app.get('/print-invoice/:id', auth.authVerify, siswaController.printInvoice); 

module.exports = app;