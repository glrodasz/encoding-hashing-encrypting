function encode(string) {
  const buffer = Buffer.from(string, "utf-8");
  return buffer.toString("base64");
}

function decode(string) {
  const buffer = Buffer.from(string, "base64");
  return buffer.toString("utf-8");
}

module.exports = {
  encode,
  decode,
};

if (process?.argv?.length > 2) {
  const [, , action, string] = process?.argv;

  if (action === "encode") {
    console.log(encode(string));
  } else if (action === "decode") {
    console.log(decode(string));
  } else {
    console.log('action needs to be "encode" or "decode"');
  }
}
