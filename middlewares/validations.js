const { validationResult } = require('express-validator');

const validations = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    next();
}

module.exports = { validations }