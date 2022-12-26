import express from 'express';
//import { ReadStream } from 'fs';
import { resizeImage, readImage, fileExists } from './utilities';
const fs = require('fs');
const sharp = require('sharp');
const images = express.Router();

images.get('/', (req, res) => {
  let filename = req.query.filename;
  let width = req.query.width as string;
  let height = req.query.height as string;

  res.set('Cache-Control', 'public, max-age=' + 50000000 / 1000);
  if (!filename) {
    res.send('Please provide an image to be processed');
  } else if (filename && (!width || !height)) {
    const result = fileExists(`${filename}.jpg`, 'images/full');
    result.then((d) => {
      if (d == -1) {
        res.json({ message: 'File does not exist' });
      } else {
        readImage(`images/full/${filename}.jpg`).pipe(res);
      }
    });
  } else {
    const result = fileExists(
      `${filename}-thumb.jpg`,
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
    });
  }
});

export default images;
