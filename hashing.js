const crypto = require("crypto");

function hashing(string) {
  return crypto.createHash("sha256").update(string).digest("base64");
}

module.exports = hashing;

if (process?.argv?.length > 2) {
  const [, , string] = process?.argv;
  console.log(hashing(string));
}
