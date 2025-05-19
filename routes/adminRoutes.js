const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/users', adminController.getAllUsers);
router.get('/employees', adminController.getEmployees);
router.get('/customers', adminController.getCustomers);
router.get('/requests', adminController.getAllRequests);
router.get('/products', adminController.getAllProducts);
router.get('/sales', adminController.getAllSales);
router.put('/users/:email', adminController.updateUser);
router.delete('/users/:email', adminController.deleteUser);

module.exports = router;