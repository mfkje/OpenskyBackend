"use strict";
const express   = require('express');
const router    = express.Router();
const { check } = require('express-validator');

const { validations } = require('../middlewares/validations');
const { registerController } = require('../controllers/register-controller');

router.route('/register')
.post([
    check('email').notEmpty().withMessage('Email cannot be empty'),
    check('password').notEmpty().withMessage('Password cannot be empty'),
    check('name').notEmpty().withMessage('Name cannot be empty'),
    //check('surname').notEmpty().withMessage('Surname cannot be empty'),
    validations
], registerController);

module.exports = router;