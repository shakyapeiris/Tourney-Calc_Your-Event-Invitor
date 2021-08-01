"use strict";

var User = require("../models/user");

var ObjectId = require("mongodb").ObjectId;

exports.getAdminPage = function (req, res, next) {
  var userId = req.params.userId;
  User.filterOne(userId).then(function (result) {
    res.render("admin/dashboard", {
      userEvents: result.events,
      userId: userId
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getAddEvent = function (req, res, next) {
  var productId = req.body.userId;
  res.render("admin/add-event", {
    id: productId
  });
};

exports.postAddEvent = function (req, res, next) {
  var _id = ObjectId();

  var title = req.body.title;
  var description = req.body.description;
  var host = req.body.host;
  var time = req.body.time.toString();
  var server = req.body.server;
  var banner = req.body.banner;
  var video = req.body.video;
  var facebook = req.body.facebook;
  var instagram = req.body.instagram;
  var user = req.body.userId;
  User.addEvent(user, {
    _id: _id,
    title: title,
    description: description,
    host: host,
    time: time,
    server: server,
    banner: banner,
    video: video,
    facebook: facebook,
    instagram: instagram
  }).then(function (result) {
    console.log(result);
    res.redirect("/admin/".concat(user));
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getEditEvent = function (req, res, next) {
  var user = req.params.userId;
  var eventId = req.params.eventId;
  User.filterOne(user).then(function (result) {
    var eventDetails = result.events.find(function (i) {
      return i._id.toString() === eventId.toString();
    });
    res.render("admin/edit-event", {
      eventDetails: eventDetails,
      user: user
    });
    console.log(req.user);
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.postEditEvent = function (req, res, next) {
  var _id = req.body.eventId;
  var title = req.body.title;
  var description = req.body.description;
  var host = req.body.host;
  var time = req.body.time.toString();
  var server = req.body.server;
  var banner = req.body.banner;
  var video = req.body.video;
  var facebook = req.body.facebook;
  var instagram = req.body.instagram;
  var user = req.body.userId;
  User.editEvent(user, {
    _id: _id,
    title: title,
    description: description,
    host: host,
    time: time,
    server: server,
    banner: banner,
    video: video,
    facebook: facebook,
    instagram: instagram
  }).then(function (result) {
    console.log(result);
    res.redirect("/admin/".concat(user));
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getDeleteEvent = function (req, res, next) {
  var userId = req.params.userId;
  var eventId = req.params.eventId;
  User.deleteEvent(userId, eventId).then(function (result) {
    console.log(result);
    res.redirect("/admin/".concat(userId));
  })["catch"](function (err) {
    console.log(err);
  });
};