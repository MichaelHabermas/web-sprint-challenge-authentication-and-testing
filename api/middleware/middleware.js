const Users = require('../users/users-model');

function checkUsernameExists(req, res, next) {
	const { username } = req.user;
	// const [user] = await Users.findBy({ username });
	// if (user) {
	// 	req.user = user;
	// 	next();
	// } else {
	// 	next({ status: 401, message: 'invalid credentials' });
	// }
	Users.findBy({ username })
		.then(user => {
			if (user) {
				req.user = user;
				next();
			} else {
				next({ status: 401, message: 'invalid credentials' });
			}
		})
		.catch(next);
}

function checkUsernameUnique(req, res, next) {
	const { username } = req.user;
	// const [user] = await Users.findBy({ username });
	// if (user) {
	// 	next({ status: 401, message: 'username taken' });
	// } else {
	// 	next();
	// }

	Users.findBy({ username })
		.then(user => {
			if (user) {
				next({ status: 401, message: 'username taken' });
			} else {
				next();
			}
		})
		.catch(next);
}

async function validateCredentials(req, res, next) {
	let { username, password } = req.body;
	if (
		!username ||
		username.trim() === '' ||
		!password ||
		password.trim() === ''
	) {
		next({ status: 400, message: 'username and password required' });
	} else {
		req.user = {
			username: username.trim(),
			password: password.trim()
		};
		next();
	}
}

module.exports = {
	checkUsernameExists,
	validateCredentials,
	checkUsernameUnique
};
