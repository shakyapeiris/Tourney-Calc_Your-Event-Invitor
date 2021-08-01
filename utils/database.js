const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  mongoClient
    .connect("mongodb+srv://Shakya:KeZebZLvR8yErAfM@cluster0.8kblv.mongodb.net/users?retryWrites=true&w=majority")
    .then((client) => {
      console.log("Database Connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDB = () => {
    if (_db){
        return _db
    }
    else {
      console.log("ERROR!")
    }
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;