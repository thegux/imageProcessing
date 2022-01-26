# Image Processing

## Getting Started

### Pre-requisites
In order to run this project properly, make sure you have the following installed:
- Node

### 

1. Install the dependencies:
```
npm install
```
2. Start your project:
```
npm start
```

## Endpoint
There are two endpoints in this application:

1. GET/IMAGES
Params:
    IMAGE_NAME - The name of the image you want to convert (You need to add the image to the directory images -> source)
    WIDTH - The resized image's width
    HEIGHT - The resized image's height
    IMAGE_EXTENSION [OPTIONAL - DEFAULT=JPG]- The resized image's extension
```
GET/images?imageName={IMAGE_NAME}&width={WIDTH}&height={HEIGHT}&imageExtension={IMAGE_EXTENSION}
```

2. GET/IMAGES/IMAGEPROCESSING
Params:
    IMAGE_NAME - The name of the image you want to convert (You need to add the image to the directory images -> source)
    WIDTH - The resized image's width
    HEIGHT - The resized image's height
    IMAGE_EXTENSION [OPTIONAL - DEFAULT=JPG] - The resized image's extension
```
GET/images/imageProcessing?imageName={IMAGE_NAME}&width={WIDTH}&height={HEIGHT}&imageExtension={IMAGE_EXTENSION}
```

## Testing
This application uses Jasmine to test its endpoints responses. Tests can be found within src -> tests.

1. To test your code:
```
npm run test
```


## Building for production

1. To build your code into ES5:
```
npm run build
```
