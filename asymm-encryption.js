const fs = require("fs");
const crypto = require("crypto");

const hashing = require("./hashing");

function encryptWithPublicKey(string) {
  const publicKey = fs.readFileSync("./public.pem", "utf8");
  const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(string));
  return encrypted.toString("hex");
}

function decryptWithPrivateKey(hash) {
  const privateKey = fs.readFileSync("./private.pem", "utf8");
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey.toString(),
      passphrase: hashing("top secret"),
    },
    Buffer.from(hash, "hex")
  );

  return decrypted.toString("utf8");
}

if (process?.argv?.length > 2) {
  const [, , action, string] = process?.argv;

  switch (action) {
    case "encrypt":
      return console.log(encryptWithPublicKey(string));
    case "decrypt":
      return console.log(decryptWithPrivateKey(string));
    default:
      return console.log('Use "encrypt" or "decrypt" action.');
  }
}
