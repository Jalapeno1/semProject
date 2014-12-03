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
    movie.find({userName: username}, function(err, result){
        if(err)
            callback(err);
        else
            callback(null, result);
    });
};

function addTitle (userName, movId, genre, imdbRating,
                   runtime, title, year, plot, callback){
    var toAdd = {
        id: movId,
        genre: genre,
        imdbRating: imdbRating,
        runtime: runtime,
        title: title,
        year: year,
        plot: plot,
        userRating: 0
    }
    movie.update({userName: userName}, {$push: {"moviesOwned":toAdd}}, function(err, result){
        if(err)
            return callback(err);
        else
            callback(null, result);
    });
};

function getDetails (user, movieId, callback){

    movie.find({userName: user},{moviesOwned: {$elemMatch: {id: movieId}}})
        .exec(function(err, result){
        if(err)
            callback(err);
        else
            callback(null, result);
    });
};

function deleteTitle (userName, movieId, callback){
    movie.update({userName: userName}, {$pull: {moviesOwned: {id: movieId}}}).exec(function(err, result){
        if(err)
            callback(err);
        else
            callback(null, result);
    });
};

function rateTitle (username, movId, starCount, callback){
    movie.update({userName: username, "moviesOwned.id": movId}, {$set: {"moviesOwned.$.userRating": starCount}})
        .exec(function(err, result){
            if(err)
                callback(err);
            else
                callback(null, result);
        });
};

module.exports = {
    userLogin: userLogin,
    adminLogin: adminLogin,
    getAllTitles: getAllTitles,
    addTitle: addTitle,
    getDetails: getDetails,
    deleteTitle: deleteTitle,
    rateTitle: rateTitle
};