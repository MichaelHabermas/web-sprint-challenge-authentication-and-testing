const bcrypt = require('bcryptjs');
const router = require('express').Router();
const tokenBuilder = require('./token-builder');
const Users = require('../users/users-model.js');

const {
	checkUsernameExists,
	validateCredentials,
	checkUsernameUnique
} = require('../middleware/middleware');

router.post(
	'/register',
	validateCredentials,
	checkUsernameUnique,
	async (req, res, next) => {
		// const { username, password } = req.user;
		let user = req.user;

		// encrypt the password
		const rounds = process.env.BCRYPT_ROUNDS || 6;
		const hash = bcrypt.hashSync(user.password, rounds);
		user.password = hash;

		// add user to the db
		Users.addUser(user)
			.then(newUser => {
				res.status(201).json(newUser);
			})
			.catch(next);
		/*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `jokes` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
	}
);

router.post(
	'/login',
	validateCredentials,
	checkUsernameExists,
	(req, res, next) => {
		const { username, password, id } = req.user;

		if (bcrypt.compareSync(password, req.validUser.password)) {
			const token = tokenBuilder({
				id,
				username
			});
			res.status(200).json({
				message: `welcome, ${username}`,
				token
			});
		} else {
			next({
				status: 401,
				message: 'invalid credentials'
			});
		}
		// res.end('implement login, please!');

		/*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
	}
);

module.exports = router;
