const {validationResult} = require('express-validator')
const BaseError = require('../utils/baseError')

const validate = (req, res, next) => {
    const error = validationResult(req);
    if(error.isEmpty()) {
        return next();
    }
    throw new BaseError(error.array()[0].msg, 400);
}

module.exports = {validate};