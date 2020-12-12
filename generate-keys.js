const fs = require('fs')
const crypto = require('crypto')
const hashing = require('./hashing')

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
	modulusLength: 4096,
	publicKeyEncoding: {
		type: 'spki',
		format: 'pem'
	},
	privateKeyEncoding: {
		type: 'pkcs8',
		format: 'pem',
		cipher: 'aes-256-cbc',
		passphrase: hashing('top secret'),
	}
})

fs.writeFileSync('public.pem', publicKey)
fs.writeFileSync('private.pem', privateKey)