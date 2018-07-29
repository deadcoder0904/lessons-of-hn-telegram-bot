const firebase = require("firebase");
const hashomatic = require("hash-o-matic");

const app = firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
});
const database = firebase.database();
const hn = database.ref("hn");

exports.writeHash = id => {
  const hash = hashomatic.hash(id);
  hn.push(hash);
};

exports.checkIfHashExists = id => {
  const hash = hashomatic.hash(id);
  hn.once("value", function(snapshot) {
    const exists = Object.values(snapshot.val()).indexOf(hash);
    if (exists === -1) return false;
    return true;
  });
};
