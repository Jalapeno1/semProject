global.TEST_DATABASE = "mongodb://test:test@ds047050.mongolab.com:47050/mydatabase";
global.SKIP_AUTHENTICATION = true;  //Skip security

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var testPort = 3535;
var testServer;
var mongoose = require("mongoose");
var assert = require("assert");
var supertest = require("supertest");


var User = mongoose.model("User");
var Movies = mongoose.model("Movies");

describe('REST API for /user', function () {
  //Start the Server before the TESTS
  before(function (done) {

    testServer = app.listen(testPort, function () {
      console.log("Server is listening on: " + testPort);
      done();
    })
    .on('error',function(err){
        console.log(err);
      });
  })

  beforeEach(function(done){
    Movies.remove({}, function ()
    {
      var movies =
        [{userName: "test",
          moviesOwned: [{
            id: "123",
            imdbURL: "www.url.com",
            genre: "Comedy",
            imdbRating: 9,
            userRating: 0,
            runtime: "213min",
            title: "The Test Movie",
            year: 2014
          },
          {
            id: "999",
            imdbURL: "www.url2.com",
            genre: "Horror",
            imdbRating: 10,
            userRating: 0,
            runtime: "90min",
            title: "Sem Project",
            year: 2012
          }]
        },{userName: "testToDelete",
          moviesOwned: [{
            id: "456",
            imdbURL: "www.url.com",
            genre: "Comedy",
            imdbRating: 9,
            userRating: 0,
            runtime: "213min",
            title: "The Test Movie",
            year: 2014
          },

          {
            id: "657",
            imdbURL: "www.url2.com",
            genre: "Horror",
            imdbRating: 10,
            userRating: 0,
            runtime: "90min",
            title: "Sem Project",
            year: 2012
          }]
        }];

      Movies.create(movies, function(err){
        done();
      });
    });
  });

  after(function(){  //Stop server after the test
    //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
    //mongoose.connection.db.dropDatabase();
    testServer.close();
  })
  
  it("Should get user test's movie collection; 'userName' should equal 'test'.", function (done) {
    var testUser = 'test';
    http.get("http://localhost:"+testPort+"/test/allMovies/"+testUser,function(res){
      res.setEncoding("utf8");//response data is now a string
      res.on("data",function(chunk){
        var n = JSON.parse(chunk);
        n.length.should.equal(1);
        n[0].userName.should.equal("test");
        done();
      });
    });
  });

  it("Should add a title; should return status code 200.", function (done) {
    supertest("http://localhost:"+testPort)
        .post("/test/addtitle/test/666/www.url.com/Drama/9/666min/randomTitle/2014")
        .expect(200)
        .end(function (err, res) {
          if (err)
            return done(err);

          done();
        }
    );
  });

  it("Should get movie details; 'Genre' should equal 'Comedy' ", function (done) {
    var testUser = 'test';
    var testId = '123';
    http.get("http://localhost:"+testPort+"/test/movie/"+testUser+"/"+testId,function(res){
      res.setEncoding("utf8");//response data is now a string
      res.on("data",function(chunk){
        var n = JSON.parse(chunk);
        n.should.have.length(1);
        assert.equal("Comedy", n[0].moviesOwned[0].genre);
        //n[0].moviesOwned.genre.should.equal("Comedy");
        done();
      });
    });
  });

  it("Should delete a movie from 'test'; should return status code 200.", function (done) {
    var testUser = 'testToDelete';
    var testId = '456';
    supertest("http://localhost:"+testPort)
        .delete("/test/movie/"+testUser+"/"+testId)
        .expect(200)
        .end(function (err) {
          if (err)
            return done(err);

          done();
        });
  });
});
