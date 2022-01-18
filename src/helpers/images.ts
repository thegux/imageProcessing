import sharp from 'sharp';

async function imageExists(fileName: string, width: number, height: number, extension: string) {
    
    const sharpImage = sharp(`images/resized/${fileName}.${extension}`);
    const data = await sharpImage.metadata()

    if(data.width === width && data.height === height) {
        return true
    } else {
        return false
    }
   
}

function resizeImage(fileName: string, width: number, height: number, extension: string)  {
    return sharp(`images/source/${fileName}.${extension}`)
        .resize(width, height)
        .toFile(`images/resized/${fileName}.${extension}`)
}


export default {
    resizeImage,
    imageExists
}