var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var facade = require("../model/facade")




/* GET home page. */
router.get('/', function(req, res) {
  res.redirect("app/index.html")
});


router.post('/authenticate', function (req, res) {
    //TODO: Go and get UserName Password from "somewhere"
    //if is invalid, return 401
    //facade.userLogin(req.body.username, req.body.password, function (err, data) {
    //    if (req.body.username === data.userName) {
    //        var profile = {
    //            username: data.userName,
    //            role: "user",
    //            id: 1000
    //        };
    //        var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, {expiresInMinutes: 60 * 5});
    //        res.json({token: token});
    //        return
    //    }
    //    else {
    //        res.status(401).send('Wrong user or password');
    //        return;
    //    }
    //});
    if (req.body.username === 'student' && req.body.password === 'test') {
        var profile = {
            username: 'Bo the Student',
            role: "user",
            id: 1000
        };
        // We are sending the profile inside the token
        var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, { expiresInMinutes: 60*5 });
        res.json({ token: token });
        return;
    }

    if (req.body.username === 'teacher' && req.body.password === 'test') {
        var profile = {
            username: 'Peter the Teacher',
            role: "admin",
            id: 123423
        };
        // We are sending the profile inside the token
        var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, { expiresInMinutes: 60*5 });
        res.json({ token: token });
        return;
    }

    else{
        res.status(401).send('Wrong user or password');
        return;
    }
});


//Get Partials made as Views
router.get('/partials/:partialName', function(req, res) {
    var name = req.params.partialName;
    res.render('partials/' + name);
});

//Gets all titles from user's collection
router.get('/test/allMovies/:user', function(req, res) {
    facade.getAllTitles(req.params.user, function(err, data){
        if(err)
            res.send(err);
        else
            res.end(JSON.stringify(data));
    })
});

//Adds a movie to collection
//router.post('/test/addtitle/:user/:movId/:genre/:imdbRating/:runtime/:title/:year/:plot', function (req, res) {
//    facade.addTitle(req.params.user, req.params.movId, req.params.genre,
//        req.params.imdbRating, req.params.runtime, req.params.title, req.params.year, req.params.plot,
//        function(err, data){
//            if(err)
//                res.send(err);
//            else
//                res.end(JSON.stringify(data));
//        });
//});

router.post('/test/addtitle/', function (req, res) {

    //var urlJSON = {
    //    "user": req.body.user,
    //    "id": req.body.id,
    //    "rating": req.body.rating,
    //    "year": req.body.year,
    //    "title": req.body.title,
    //    "genre": req.body.genre,
    //    "runtime": req.body.runtime,
    //    "plot": req.body.plot
    //};

    facade.addTitle(req.body.user, req.body.id, req.body.rating,
        req.body.year, req.body.title, req.body.genre, req.body.runtime, req.body.plot, req.body.poster,
        function(err, data){
            if(err)
                res.send(err);
            else
                res.end(JSON.stringify(data));
        });
});

//Adds user rating to a given movie
router.post('/test/addRating/:user/:movId/:rating', function(req, res){
    facade.rateTitle(req.params.user, req.params.movId, req.params.rating ,function(err, data){
        if(err)
            res.send(err);
        else
            res.end(JSON.stringify(data));
    })
})

//Gets details of given movie
router.get('/test/movie/:user/:id', function(req, res) {
    facade.getDetails(req.params.user, req.params.id, function(err, data){
        if(err)
            res.send(err);
        else
            res.end(JSON.stringify(data));
    })
});

//Deletes Title
router.delete('/test/movie/:user/:id', function(req, res) {
    facade.deleteTitle(req.params.user, req.params.id, function(err, data){
        if(err)
            res.send(err);
        else
            res.end(JSON.stringify(data));
    })
});

module.exports = router;
