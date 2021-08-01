"use strict";

var User = require("../models/user");

exports.getIndex = function (req, res, next) {
  res.render("client/login");
};

exports.postLogin = function (req, res, next) {
  User.filterOne(req.body.token).then(function (result) {
    if (result) {
      req.userId = req.body.token;
      res.redirect("/admin/".concat(req.userId));
      next();
    } else {
      console.log("Wrong Credentials");
    }
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.register = function (req, res, next) {
  User.register().then(function (result) {
    res.render('client/register', {
      id: result.insertedId
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getInvitation = function (req, res, next) {
  var eventId = req.params.eventId;
  var reciever = req.query.reciever;
  User.findInviation(eventId).then(function (result) {
    res.render('client/event', {
      details: result,
      to: reciever
    });
  })["catch"](function (err) {
    console.log(err);
  });
};