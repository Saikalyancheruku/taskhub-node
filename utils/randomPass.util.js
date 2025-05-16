const crypto = require('crypto');

const generateRandomPassword = () => {
  return crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '');
};

module.exports = {
  generateRandomPassword
};
