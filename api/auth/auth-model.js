const db = require('../../data/dbConfig.js');

const findBy = filter => {
	return db('auth').where({ filter }).first();
};

const findById = id => {
	return db('auth').where({ id }).first();
};

async function addUser({ username, password }) {
	const [user_id] = await db('auth').insert({
		username: username,
		password: password
	});
	return findById(user_id);
}

module.exports = { findBy, findById, addUser };
