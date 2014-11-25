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

router.post('/test/addtitle', function (req, res) {
    facade.addTitle("test", "123", "www.url.com", "Drama",
        9, "666min", "YAY!", 2014, function(err, data){
            if(err)
                res.send(err);
            else
                res.end(JSON.stringify(data));
        });
})

module.exports = router;
