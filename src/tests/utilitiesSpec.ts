import { ReadStream } from 'fs';
import { resizeImage, readImage, fileExists } from '../routes/api/utilities';

describe('Testing utility functions', () => {
  it('check readImage returns instance of ReadStream', () => {
    const readstream = readImage('indexSpec.ts');
    const flag = readstream instanceof ReadStream;
    expect(flag).toBe(true);
  });
  it('check the resize image function', () => {
    resizeImage('fjord', '400', '400');
    const flag = fileExists('fjord-thumb.jpg', 'images/thumb', '400', '400');
    flag.then((d) => {
      expect(d).toEqual(0);
    });
  });
});
