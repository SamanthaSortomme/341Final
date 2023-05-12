const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;


const initDb = async (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    callback(null, _db);
    return;
  }
  console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV")
  console.log(process.env.MONGO_URI)
  console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

  await MongoClient.connect(process.env.MONGO_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb =  () => {
  if (!_db) {
    console.log('is this happening first?~~~~~~~~~~~~~~~~~~~~~')

    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
