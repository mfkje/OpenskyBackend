"use strict";
const express   = require('express');
const router    = express.Router();
const { check } = require('express-validator');

const { validations } = require('../middlewares/validations');
const { nftController } = require('../controllers/nft-controller');

router.route('/create-nft')
.post([
    check('userId').notEmpty().withMessage('UserID is mandatory'),
    check('title').notEmpty().withMessage('title cannot be empty'),
    check('price').notEmpty().withMessage('price cannot be empty'),
    check('category').notEmpty().withMessage('category cannot be empty'),
    check('imageUrl').notEmpty().withMessage('imageUrl cannot be empty'),
    validations
], nftController);

module.exports = router;