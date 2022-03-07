//genrate serviceAcount key from firebase drop it in dotenvVariable

const admin = require("firebase-admin");

const serviceAccount = require("../dotenvVariables/fbServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin