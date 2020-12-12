const crypto = require("crypto");

const alg = "aes256";

function createInizialitionVector() {
  const resizedIV = Buffer.allocUnsafe(16);
  const iv256 = crypto.createHash("sha256").update("ivseed").digest();
  iv256.copy(resizedIV);
  return resizedIV;
}

const iv = createInizialitionVector();

function encrypt(string, key) {
  const hashedKey = crypto.createHash("sha256").update(key).digest();
  const cipher = crypto.createCipheriv(alg, hashedKey, iv);
  const ecrypted = Buffer.concat([cipher.update(string), cipher.final()]);

  return ecrypted.toString("hex");
}

function decrypt(hash, key) {
  const hashedKey = crypto.createHash("sha256").update(key).digest();
  const decipher = crypto.createDecipheriv(alg, hashedKey, iv);

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString();
}

module.exports = {
  encrypt,
  decrypt,
};

if (process?.argv?.length > 2) {
  const [, , action, key, string] = process?.argv;

  switch (action) {
    case "encrypt":
      return console.log(encrypt(string, key));
    case "decrypt":
      return console.log(decrypt(string, key));
    default:
      return console.log('Use "encrypt" or "decrypt" action.');
  }
}
