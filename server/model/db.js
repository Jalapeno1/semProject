var mongoose = require( 'mongoose' );

/*

Note:
To this test project as it is:

Start your MongoDB database.
Start mongo.exe and do:
  use testdb
  db.testusers.insert({userName : "Lars", email :"lam@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Henrik", email :"hsty@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Tobias", email :"tog@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Anders", email :"aka@cphbusiness.dk",pw: "test",created : new Date()})

*/
var dbURI;

//This is set by the backend tests
if( typeof global.TEST_DATABASE != "undefined" ) {
  dbURI = global.TEST_DATABASE;
}
else{
  dbURI = 'mongodb://test:test@ds047050.mongolab.com:47050/mydatabase';
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  global.mongo_error = "Not Connected to the Database";
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});


/** User SCHEMA **/
/** Replace this Schema with your own(s) **/
var usersSchema = new mongoose.Schema({
  userName : String,
  email: {type: String, unique: true},
  pw: String
});

mongoose.model( 'User', usersSchema,"testusers" );

var adminsSchema = new mongoose.Schema({
  userName : String,
  email: {type: String, unique: true},
  pw: String
});

mongoose.model( 'Admin', adminsSchema,"testadmins" );

var movieSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true},
  moviesOwned: [{
    id: {
      type: String,
      required: true,
      unique: true
    },
    genre: String,
    imdbRating: String,
    runtime: String,
    title: {
      type: String,
      required: true
    },
    year: String,
    plot: String,
    userRating: Number
  }]
});

mongoose.model( 'Movies', movieSchema,"movies" );