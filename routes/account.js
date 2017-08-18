var express = require('express');
var router = express.Router();
var accountController =  require('../controllers/accountController');

router.post('/login', accountController.login);
<<<<<<< HEAD
router.post('/logout', accountController.logout);
=======
router.get('/logout', accountController.logout);
router.post('/signup', accountController.signup);
>>>>>>> 84399bc27e0f409f680142574c47f5af2a4cdd9e

module.exports = router;
