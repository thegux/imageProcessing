import sharp from 'sharp';
import fs from 'fs';

/**IMAGE PARAMS FUNCTION */
async function imageParams(fileName: string):Promise<imageParamsResponse> {
	const imagePath = `images/source/${fileName}.jpg`;
	if (fs.existsSync(imagePath)) {
		const sharpImage = sharp(imagePath);
		const data = await sharpImage.metadata();

		return { ...data, imageExists: true };
	}
	return {
		chromaSubsampling: '',
		imageExists: false,
	};
}

interface imageParamsResponse extends sharp.Metadata {
	imageExists: boolean,
}

/**RESIZE IMAGE FUNCTION */
function resizeImage(
	fileName: string,
	width: number,
	height: number,
	extension: string
):Promise<sharp.OutputInfo> {

	return sharp(`images/source/${fileName}.jpg`)
		.resize(width, height)
		.toFile(`images/resized/${fileName}(${width}x${height}).${extension}`);
}


export default {
	resizeImage,
	imageParams,
};
