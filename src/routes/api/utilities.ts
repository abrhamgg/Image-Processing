import { ReadStream } from 'fs';
const fs = require('fs');
const sharp = require('sharp');

export function readImage(path:string): ReadStream {
  const readStream = fs.createReadStream(path);
  return readStream;
}

export async function getMatadata(path: string): Promise<object> {
  /*
      getMatadata - function to get width and height of given image
      @path: image to be processed
      Returns: object including the height and width of the image.
    */
  let imageProperty = { width: 0, height: 0 };
  try {
    const image = await sharp(path);
    const metadata = await image.metadata();
    imageProperty.width = metadata.width;
    imageProperty.height = metadata.height;
    return imageProperty;
  } catch (error) {
    console.log(`An error occured processing the image ${error}`);
  }
  return {};
}

export async function fileExists(
  filename: string,
  dir: string,
  width?: string,
  height?: string
): Promise<number> {
  /* fileExists - Function to check if an image file exists in given directory
  
       @filename: filename of the image to be searched
       @width: width of the image in pixels
       @height: height of the image in pixels
       Return: 0 -> if the file with the same height and width exist
               1 -> if the file exists but with different height or width
              -1 -> if the file doesnot exist
    */
  const { readdir } = require('fs/promises');
  const files = await readdir(dir);
  for (const file of files) {
    if (file == filename && (!width || !height)) {
      return 1;
    } else if (file == filename) {
      let metadata = getMatadata(`images/thumb/${filename}`);
      const imgSize = await metadata;
      const img_values = Object.values(imgSize);
      const img_width = img_values[0];
      const img_height = img_values[1];
      if (img_width == width && img_height == height) {
        return 0;
      }
      return 1;
    }
  }
  return -1;
}

export async function resizeImage(
  filename: string,
  width: string,
  height: string
): Promise<void> {
  /**
   * resizeImage - function to resize a given image with specific height and width
   * @filename : image to be resized
   * @width : width of the new image
   * @height : height of the new image
   *
   * Return: void but saves the reiszed image to the 'images/thumb' directory
   */
  let w = parseInt(width);
  let h = parseInt(height);
  try {
    await sharp(`images/full/${filename}.jpg`)
      .resize({
        width: w,
        height: h,
      })
      .toFile(`images/thumb/${filename}-thumb.jpg`);
  } catch (error) {
    console.log(`resizing failed ${error}`);
  }
}
