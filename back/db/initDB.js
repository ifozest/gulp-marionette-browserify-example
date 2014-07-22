var mongo = require('mongodb')
  , MongoClient = mongo.MongoClient
  , MongoServer = mongo.Server
  , settings = require('./settings')
  , mongoClient = new MongoClient(new MongoServer(settings.host, settings.port))
  , db = mongoClient.db(settings.databaseName);

/**
 * open connection to db and authenticate it
 */
mongoClient.open(function (err) {
  if (err) throw err;
  db.authenticate(settings.login, settings.password, function (err) {
    if (err) {
      throw new Error('mongoDB authentication fail');
    }
  });
});

module.exports = db;