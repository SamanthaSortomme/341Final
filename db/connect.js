const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
let _db;

const getDb = async () => {
  if (!_db){
    console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV")
    console.log(process.env.MONGO_URI)
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    const client = await MongoClient.connect(process.env.MONGO_URI)
    _db = client
  }
  return _db
};

module.exports = {
  // initDb,
  getDb,
};
