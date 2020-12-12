function encode(string) {
  const buffer = Buffer.from(string, "utf8");
  return buffer.toString("base64");
}

function decode(string) {
  const buffer = Buffer.from(string, "base64");
  return buffer.toString("utf8");
}

module.exports = {
  encode,
  decode,
};

if (process?.argv?.length > 2) {
  const [, , action, string] = process?.argv;

  switch (action) {
    case "encode":
      return console.log(encode(string));
    case "decode":
      return console.log(decode(string));
    default:
      return console.log('Use "encode" or "decode" action.');
  }
}
