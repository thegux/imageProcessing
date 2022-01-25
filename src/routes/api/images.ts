import express from 'express';
import imagesHelper from '../../helpers/images';
import fs from 'fs';

const images = express.Router();

images.get('/images', (req: express.Request, res: express.Response) => {
	const imageName = String(req.query.imageName);
	let imageExtension = String(req.query.imageExtension);
	imageExtension = imageExtension !== 'undefined' ? imageExtension : 'jpg';
	const imagePath = `images/resized/${imageName}.${imageExtension}`;

	if (fs.existsSync(imagePath)) {
		res.status(200);
		res.sendFile(imagePath, { root: '.' });
	} else {
		res.status(404);
		res.send(
			"This image doesn't exist, please provide an image in the folder images->source"
		);
	}
});

images.get(
	'/images/imageProcessing',
	async (req: express.Request, res: express.Response) => {
		const imageName = String(req.query.imageName);
		let imageExtension = String(req.query.imageExtension);

		const width = Number(req.query.width);
		const height = Number(req.query.height);

		imageExtension = imageExtension !== 'undefined' ? imageExtension : 'jpg';

		if (imageName && (width || height)) {
			const imageExists = await imagesHelper.imageExists(
				imageName,
				width,
				height,
				imageExtension
			);

			if (!imageExists) {
				imagesHelper
					.resizeImage(imageName, width, height, imageExtension)
					.then(() => {
						res.status(302);
						res.redirect(
							`/images?imageName=${imageName}&imageExtension=${imageExtension}`
						);
					});
			} else {
				res.status(302);
				res.redirect(
					`/images?imageName=${imageName}&imageExtension=${imageExtension}`
				);
			}
		} else {
			res.status(400);
			res.send(
				`This api requires an imageName, width, and height parameter to properly resize it`
			);
		}
	}
);

export default images;
