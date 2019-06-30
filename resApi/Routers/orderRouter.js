var express = require('express');
var router = express.Router();

// Userlogin controller page require
const OrdersController = require('../Controllers/ordersController');

// Orders add
router.post('/Ordersadd', OrdersController.OrdersnewdataAdd);
router.post('/Ordersupdateget', OrdersController.Ordersupdateget);
router.post('/Ordersupdate', OrdersController.UpdateOrdersnewdata);
router.post('/Ordersdelete', OrdersController.OrdersnewdataDelete);
// user login router define
router.get('/Orders', OrdersController.OrdersgetControllers);

module.exports = router;