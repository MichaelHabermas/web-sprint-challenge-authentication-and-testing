const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');
// const Jokes = require('../users/jokes-model');

const validateUsername = (req, res, next) => {
	next();
};

module.exports = {
	validateUsername
};
