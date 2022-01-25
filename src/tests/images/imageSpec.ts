import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Testing Image endpoint responses', () => {
	it('gets an image', async () => {
		const response = await request.get('/images?imageName=santamonica');
		expect(response.type).toBe('image/jpeg');
		expect(response.status).toBe(200);
	});

	it('throws error in case of missing image', async () => {
		const response = await request.get('/images?imageName=testNoImage');
		expect(response.text).toBe(
			"This image doesn't exist, please provide an image in the folder images->source"
		);
		expect(response.status).toBe(404);
	});

	it('redirects in case of sucess', async () => {
		const response = await request.get(
			'/images/imageProcessing?imageName=santamonica&width=200&height=300'
		);
		expect(response.status).toBe(302);
	});

	it('throws error in case of missing params', async () => {
		const response = await request.get(
			'/images/imageProcessing?imageName=santamonica'
		);
		expect(response.text).toBe(
			'This api requires an imageName, width, and height parameter to properly resize it'
		);
		expect(response.status).toBe(400);
	});
});
