const crypto = require('crypto');

function generateSecretKey(length) {
  return crypto.randomBytes(length).toString('hex');
}

const secretKey = generateSecretKey(10); // 32 bytes will generate a 64-character hexadecimal string
console.log(`Generated JWT Secret Key: ${secretKey}`);
