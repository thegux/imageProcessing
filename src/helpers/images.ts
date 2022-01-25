import sharp from 'sharp';
import fs from 'fs';

async function imageParams(fileName: string) {
	const imagePath = `images/source/${fileName}.jpg`;
	if (fs.existsSync(imagePath)) {
		const sharpImage = sharp(imagePath);
		const data = await sharpImage.metadata();

		return { ...data, imageExists: true };
	}
	return {
		width: null,
		height: null,
		imageExists: false,
	};
}

function resizeImage(
	fileName: string,
	width: number,
	height: number,
	extension: string
) {
	return sharp(`images/source/${fileName}.jpg`)
		.resize(width, height)
		.toFile(`images/resized/${fileName}(${width}x${height}).${extension}`);
}

export default {
	resizeImage,
	imageParams,
};
