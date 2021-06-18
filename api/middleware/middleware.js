const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');

const checkUsernameExists = async (req, res, next) => {
	const { username } = req.body;
	const [user] = await Users.findBy({ username });
	if (user) {
		next({ status: 401, message: 'username taken' });
	} else {
		req.user = user;
		next();
	}
};

const validateCredentials = async (req, res, next) => {
	let { username, password } = req.body;
	if (
		!username ||
		username.trim() === '' ||
		!password ||
		password.trim() === ''
	) {
		next({ status: 400, message: 'username and password required' });
	} else {
		req.username = username.trim();
		next();
	}
};

module.exports = {
	checkUsernameExists,
	validateCredentials
};
