var express = require('express');
var router = express.Router();
var accountController =  require('../controllers/accountController');

router.post('/login', accountController.login);
router.post('/logout', accountController.logout);

module.exports = router;
