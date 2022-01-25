import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', (req, res) => {
	res.send('Welcome to the Image Processing API');
});

routes.use('/', images);

export default routes;
