import express, { Request, Response } from 'express';
import { resizeImage, readImage, fileExists } from './utilities';
const fs = require('fs');
const sharp = require('sharp');
const images = express.Router();

images.get('/', (req:Request, res:Response):void => {
  let filename = req.query.filename;
  let width = req.query.width as string;
  let height = req.query.height as string;

  if (!filename) {
    res.send('Please provide a file');
  } else if (isNaN(parseInt(width)) || isNaN(parseInt(height))) {
    res.send('<h2>Please provide correct url</h2> <br> http://localhost:3000/api/images?filename=fjord&width=500&height=500');
  } else if (parseInt(width) <= 0 || parseInt(height) <= 0){
    res.send('Negative or 0 values for width and height is not allowed');
  } 
  else {
    console.log(`${filename}-${width}-${height}.jpg`);
    const file_exists = fileExists(`${filename}.jpg`, 'images/full');
    file_exists.then((result) => {
      if (result !== 1) {
        res.send('<h1>Image file does not exist.</h1><br><h4>please look for available images at the images folder.</h4>');
      }
      else {
        const specific_image = fileExists(`${filename}-${width}-${height}.jpg`, 'images/thumb', width, height);
        specific_image.then((result) => {
          if (result == 0) {
            readImage(`images/thumb/${filename}-${width}-${height}.jpg`).pipe(res);
          } else {
            console.log('resizing the image..');
            resizeImage(`${filename}`, width, height);
            const r = fileExists(`${filename}-${width}-${height}.jpg`,'images/thumb', width, height);
            r.then((d)=>{
              if (d ==0){
                //res.send('file is resized and it exists');
                readImage(`images/thumb/${filename}-${width}-${height}.jpg`).pipe(res);
              } else {
                res.send('file is resized but the server needs refresh<br>please reload the web page');
              }
            });
            //readImage(`images/thumb/${filename}-${width}-${height}.jpg`).pipe(res);
          }
        });
      }
    });
    /*
    res.set('Cache-Control', 'public, max-age=' + 50000000 / 1000);
      const result = fileExists(
        `${filename}-${width}-${height}.jpg`,
        'images/thumb',
        width,
        height
      );
      result.then((d) => {
        if (d == 0) {
          readImage(`images/thumb/${filename}-thumb.jpg`).pipe(res);
        } else if (width && height) {
          resizeImage(`${filename}`, width, height);
          readImage(`images/thumb/${filename}-thumb.jpg`).pipe(res);
        }
      });*/
  }
});

export default images;
