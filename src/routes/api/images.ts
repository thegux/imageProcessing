import express from 'express';
import imagesHelper from '../../helpers/images';
import fs from 'fs';

const images = express.Router();

images.get('/images', async (req: express.Request, res: express.Response) => {
	const imageName = String(req.query.imageName);
	// GETTING AND VALIDATING imageExtension
	let imageExtension = String(req.query.imageExtension);
	imageExtension = imageExtension !== 'undefined' ? imageExtension : 'jpg';

	// GETTING ORIGINAL PARAMS
	const originalImageInfo = await imagesHelper.imageParams(imageName);

	// GETTING AND VALIDATING width and height
	const width = isNaN(Number(req.query.width))
		? originalImageInfo.width
		: Number(req.query.width);
	const height = isNaN(Number(req.query.height))
		? originalImageInfo.height
		: Number(req.query.height);

	const imagePath = `images/resized/${imageName}(${width}x${height}).${imageExtension}`;

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
		// GETTING PARAM imageName
		const imageName = String(req.query.imageName);

		// GETTING AND VALIDATING imageExtension
		let imageExtension = String(req.query.imageExtension);
		imageExtension = imageExtension !== 'undefined' ? imageExtension : 'jpg';

		// GETTING ORIGINAL PARAMS
		const originalImageInfo = await imagesHelper.imageParams(imageName);

		// GETTING AND VALIDATING width and height
		const width = isNaN(Number(req.query.width))
			? originalImageInfo.width
			: Number(req.query.width);
		const height = isNaN(Number(req.query.height))
			? originalImageInfo.height
			: Number(req.query.height);

		//BOTH DIMENSIONS NAN
		const invalidDimensions =
			isNaN(Number(req.query.width)) && isNaN(Number(req.query.height));

		const redirectPath = `/images?imageName=${imageName}&imageExtension=${imageExtension}&width=${width}&height=${height}`;

		if (!originalImageInfo.imageExists) {
			res.status(404);
			res.send(
				"Source image doesn't exist, please provide an image in the folder images->source"
			);
		} else {
			if (imageName && width && height && !invalidDimensions) {
				const resizedImageExists = fs.existsSync(
					`images/resized/${imageName}(${width}x${height}).${imageExtension}`
				);

				if (!resizedImageExists) {
					imagesHelper
						.resizeImage(imageName, width, height, imageExtension)
						.then(() => {
							res.status(302);
							res.redirect(redirectPath);
						})
						.catch((e) => {
							res.status(400);
							res.send(
								`The following error occured when trying to resize the image: ${e}`
							);
						});
				} else {
					res.status(302);
					res.redirect(redirectPath);
				}
			} else {
				res.status(400);
				res.send(
					`This api requires an imageName (type = string), width (type = number) or height (type = number) parameter to properly resize it`
				);
			}
		}
	}
);

export default images;
