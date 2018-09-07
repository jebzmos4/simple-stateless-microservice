/**
 * Created by Morifeoluwa on 06/09/2018.
 * objective: building to scale
 */
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const resizeImg = require('resize-img');
const download = require('image-downloader');

const config = require('../config/settings');

const { key } = config.auth;

class User {
  /**
     *
     * @param {*} logger Logger Object
     */
  constructor(logger) {
    this.logger = logger;
  }

  login(data) {
    return new Promise((resolve, reject) => {
      this.logger.info('validating param and genarating token');
      const token = jwt.sign(data, key);
      if (token) {
        return resolve(token);
      }
      return reject(new Error('error occured while generating token'));
    });
  }

  validateToken(token) {
    this.logger.info('validating token');
    jwt.verify(token, key, (err, response) => {
      if (err) {
        return err;
      } this.logger.info('Successfully validated user token, user is authorized');
      return response;
    });
  }

  downloadImage(options) {
    this.logger.info('Downloading image');
    download.image(options)
      .then(({ filename }) => {
        this.logger.info('File successfully saved as', filename);
        resizeImg(fs.readFileSync(filename), { width: 50, height: 50 }).then((buf) => {
          fs.writeFileSync(`./${filename}`, buf);
          this.logger.info('Successfully generated thumbnail');
        });
      }).catch((err) => {
        this.logger.error('error generating thumbnail', err);
      });
  }

  generateThumbnail(token, url) {
    return new Promise((resolve, reject) => {
      const data = this.validateToken(token);
      if (!data || data === undefined) {
        this.logger.info('Generating thumbnail');
        const imageExtension = path.extname(url);
        this.logger.info('image extension gotten is', imageExtension);
        if (imageExtension === '.bmp' || imageExtension === '.jpg' || imageExtension === '.png') {
          const options = {
            url,
            dest: './thumbnails'
          };
          this.logger.info('Calling Image download library');
          this.downloadImage(options);
          return resolve('Successfully generated thumbnail');
        } return reject(new Error('Unsupported image extension type'));
      } return reject(data);
    });
  }
}

module.exports = User;
