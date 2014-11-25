var express = require('express');
var mongoose = require('mongoose');

// Schemas
var user = mongoose.model('User');
var admin = mongoose.model('Admin');
var movie = mongoose.model('Movies');

function userLogin(userName, password, callback){
    user.find({$and: [{userName: userName}, {pw: password}]}, function(err, result){
        if(err) {
            console.log("Error: "+err);
            callback(err);
        }
        else {
            console.log("Result: "+result);
            callback(null, result);
        }
    })
};

function adminLogin(userName, password, callback){};

// Returns all titles
function getAllTitles (username, callback){
    movie.find({userName: username}, function(err, reasult){
        if(err)
            callback(err);
        else
            callback(null, result);
    });
};

function addTitle (userName, movId, imdbURL, genre, imdbRating,
                   runtime, title, year, callback){
    var toAdd = {
        movId: movId,
        imdbURL: imdbURL,
        genre: genre,
        imdbRating: imdbRating,
        runtime: runtime,
        title: title,
        year: year
    }
    movie.update({userName: userName}, {$push: {"moviesOwned":toAdd}}, function(err, result){
        if(err)
            return callback(err);
        else
            callback(null, result);
    });
};

function getDetails (movId, callback){};

function deleteTitle (movId, callback){};

function rateTitle (movId, startCount, callback){};

module.exports = {
    userLogin: userLogin,
    adminLogin: adminLogin,
    getAllTitles: getAllTitles,
    addTitle: addTitle,
    getDetails: getDetails,
    deleteTitle: deleteTitle,
    rateTitle: rateTitle
};