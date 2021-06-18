// Write your tests here

const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

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
	// await db.seed.run();
});
afterAll(async () => {
	await db.destroy();
});

describe('Register Functions', () => {
	describe('create new user', () => {
		it('adds user to the db', async () => {
			// let jokes;
			// await Users.create(user);
			// jokes = await db('jokes');
			// expect(jokes).toHaveLength(14);
			// await jokes.create(joke2);
			// jokes = await db('jokes');
			// expect(jokes).toHaveLength(15);
		});

		it('returns the correct user', async () => {
			// const joke = await Jokes.create(joke1);
			// expect(joke).toMatchObject({ name: 'Betty', budget: 40000 });
		});
	});

	describe('Login functions', () => {
		it('deletes joke from the db', async () => {
			// const [id] = await db('jokes').insert(joke1);
			// let joke = await db('jokes').where({ id }).first();
			// expect(joke).toBeTruthy();
			// await request(server).delete('/api/jokes/' + id);
			// joke = await db('jokes').where({ id }).first();
			// expect(joke).toBeFalsy();
		});

		it('respond with te deleted joke', async () => {
			// await db('jokes').insert(joke1);
			// let joke = await request(server).delete('/api/jokes/14');
			// expect(joke.body).toMatchObject(joke1);
		});
	});
});
