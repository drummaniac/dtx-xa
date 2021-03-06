'use strict';

const fs = require('fs');
const XAConverter = require('./xaconverter');

/**
 * Converts XA audio file to RIFF WAV
 * @param {(string|Buffer)} srcFilename Path to XA audio file
 * @param {string=} dstFilename Destination of decoded RIFF
 * @returns {Promise} Decoded buffer
 */
module.exports = function convert(srcFilename, dstFilename) {
  let converter = new XAConverter(srcFilename);
  return converter.convert(srcFilename)
    .then(wav => {
      if (!dstFilename) {
        return Promise.resolve(wav);
      }

      return new Promise((resolve, reject) => {
        fs.writeFile(dstFilename, wav.buffer, error => {
          if (error) {
            reject(error)
          }
          else {
            resolve(true)
          }
        })
      });
    })
};
