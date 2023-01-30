const express = require('express');

const userController = require('../user.controller');

const router = express.Router();

router.get('/all',userController.getUser)

router.post('/login',userController.login)



module.exports = router;