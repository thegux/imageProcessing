import sharp from 'sharp';
import fs from 'fs';

async function imageExists(
	fileName: string,
	width: number,
	height: number,
	extension: string
) {
	const imagePath = `images/resized/${fileName}.${extension}`;
	if (fs.existsSync(imagePath)) {
		const sharpImage = sharp(imagePath);
		const data = await sharpImage.metadata();

		if (data.width === width && data.height === height) {
			return true;
		}
	}

	return false;
}

function resizeImage(
	fileName: string,
	width: number,
	height: number,
	extension: string
) {
	return sharp(`images/source/${fileName}.${extension}`)
		.resize(width, height)
		.toFile(`images/resized/${fileName}.${extension}`);
}

export default {
	resizeImage,
	imageExists,
};
