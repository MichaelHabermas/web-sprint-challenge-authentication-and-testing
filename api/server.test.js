const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');
const Users = require('./users/users-model');

const joke1 = {
	id: '0189hNRf2g',
	joke: "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."
};
const joke2 = {
	id: '08EQZ8EQukb',
	joke: "Did you hear about the guy whose whole left side was cut off? He's all right now."
};
const joke3 = {
	id: '08xHQCdx5Ed',
	joke: 'Why didn’t the skeleton cross the road? Because he had no guts.'
};
const user = {
	username: 'Biff',
	password: '12341234'
};

test('sanity', () => {
	expect(true).toBeTruthy();
	expect(process.env.NODE_ENV).toBe('testing');
});

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});
beforeEach(async () => {
	await db('users').truncate();
});
afterAll(async () => {
	await db.destroy();
});

describe('Entry Functions', () => {
	describe('Register new user', () => {
		it('adds user to the db, return correct status code 201', async () => {
			// let jokes;
			let registered = await request(server)
				.post('/api/auth/register')
				.send(user);

			expect(registered.status).toBe(201);

			// let status;
			// Users.create(user)
			// 	.then(newUser => {
			// 		status = res.status;
			// 	})
			// 	.catch(next);
			// expect(status).toBe(200);
			// jokes = await db('jokes');
			// await jokes.create(joke2);
			// jokes = await db('jokes');
			// expect(jokes).toHaveLength(15);
		});

		it('returns the correct user', async () => {
			let registered = await request(server)
				.post('/api/auth/register')
				.send(user);

			expect(registered.body.username).toBe('Biff');
			// const joke = await Jokes.create(joke1);
			// expect(joke).toMatchObject({ name: 'Betty', budget: 40000 });
		});
	});

	describe('Login functions', () => {
		it('logs user to the db, return correct status code 200', async () => {
			await request(server).post('/api/auth/register').send(user);

			let loggedUser = await request(server)
				.post('/api/auth/login')
				.send(user);
			// expect(loggedUser.body.message).toEqual('welcome, Biff');
			expect(loggedUser.status).toBe(200);
			// const [id] = await db('jokes').insert(joke1);
			// let joke = await db('jokes').where({ id }).first();
			// expect(joke).toBeTruthy();
			// await request(server).delete('/api/jokes/' + id);
			// joke = await db('jokes').where({ id }).first();
			// expect(joke).toBeFalsy();
		});

		it('responds with correct message', async () => {
			await request(server).post('/api/auth/register').send(user);

			let loggedUser = await request(server)
				.post('/api/auth/login')
				.send(user);
			expect(loggedUser.body.message).toEqual('welcome, Biff');
			// await db('jokes').insert(joke1);
			// let joke = await request(server).delete('/api/jokes/14');
			// expect(joke.body).toMatchObject(joke1);
		});
	});

	describe('Getting Jokes', () => {
		it('return correct status code 200', async () => {
			await request(server).post('/api/auth/register').send(user);

			await request(server).post('/api/auth/login').send(user);

			let jokes = await request(server).get('/api/jokes');

			expect(jokes).toBe(200);
			// const [id] = await db('jokes').insert(joke1);
			// let joke = await db('jokes').where({ id }).first();
			// expect(joke).toBeTruthy();
			// await request(server).delete('/api/jokes/' + id);
			// joke = await db('jokes').where({ id }).first();
			// expect(joke).toBeFalsy();
		});

		it('responds with correct jokes', async () => {
			// await db('jokes').insert(joke1);
			// let joke = await request(server).delete('/api/jokes/14');
			// expect(joke.body).toMatchObject(joke1);
		});
	});
});
