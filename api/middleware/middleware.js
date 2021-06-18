const jwt = require('jsonwebtoken');
const Auth = require('../auth/auth-model');

const checkUsernameExists = async (req, res, next) => {
	const { username } = req.body;
	const [user] = await Auth.findBy({ username });
	if (user) {
		req.user = user;
		next();
	} else {
		next({ status: 401, message: 'Invalid credentials' });
	}
};

const validateUserName = async (req, res, next) => {
	let { username } = req.body;
	if (!username || username.trim() === '') {
		next({ status: 400, message: 'Invalid username' });
	} else {
		username = username.trim();
		if (username.length > 25 || username.length < 4) {
			next({
				status: 422,
				message:
					'Username can not be longer than 25 or less than 4 chars'
			});
		} else {
			req.username = username;
			next();
		}
	}
};

module.exports = {
	checkUsernameExists,
	validateUserName
};
