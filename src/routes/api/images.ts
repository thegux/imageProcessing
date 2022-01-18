import express from 'express';
import imagesHelper from '../../helpers/images'

const images = express.Router();

images.get('/images', async (req: express.Request, res: express.Response) => {
    const imageName:string = String(req.query.imageName);
    const imageExtension:string = String(req.query.imageExtension);
    const width:number = Number(req.query.width);
    const height:number = Number(req.query.height);
    let extension:string = imageExtension !== 'undefined' ? imageExtension : 'jpg';


    if(imageName) {
        const imageExists = await imagesHelper.imageExists(imageName, width, height, extension);
        if(!imageExists) {
            const imageResponse = await imagesHelper.resizeImage(imageName, width, height, extension)
        } else {
            console.log(`images/resized/${imageName}.${extension}`)
            res.sendFile(`images/resized/${imageName}.${extension}`, { root: '.' })
        }
        
    } else {
        res.send(`This api requires an imageName paramete to properly resize it.}`)
    };
}); 

export default images;