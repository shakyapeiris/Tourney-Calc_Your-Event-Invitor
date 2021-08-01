"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getDB = require("../utils/database").getDB;

var objectId = require("mongodb").ObjectId;

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "filterOne",
    value: function filterOne(userId) {
      var db = getDB();
      return db.collection("users").findOne({
        _id: new objectId(userId)
      });
    }
  }, {
    key: "register",
    value: function register() {
      var db = getDB();
      return db.collection("users").insertOne({
        events: []
      });
    }
  }, {
    key: "addEvent",
    value: function addEvent(userId, event) {
      var db = getDB();
      return this.filterOne(userId).then(function (result) {
        var events = result.events;
        events.push(event);
        return db.collection("users").updateOne({
          _id: new objectId(userId)
        }, {
          $set: {
            events: events
          }
        });
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  }, {
    key: "deleteEvent",
    value: function deleteEvent(userId, event) {
      var db = getDB();
      return this.filterOne(userId).then(function (result) {
        var events = result.events.filter(function (i) {
          return i._id.toString() != event.toString();
        });
        return db.collection("users").updateOne({
          _id: new objectId(userId)
        }, {
          $set: {
            events: events
          }
        });
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  }, {
    key: "editEvent",
    value: function editEvent(userId, event) {
      var db = getDB();
      return this.filterOne(userId).then(function (result) {
        console.log("EventID", event._id);
        console.log();
        var eventIndex = result.events.findIndex(function (i) {
          return i._id.toString() === event._id.toString();
        });

        var events = _toConsumableArray(result.events);

        events[eventIndex] = event;
        return db.collection("users").updateOne({
          _id: new objectId(userId)
        }, {
          $set: {
            events: events
          }
        });
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  }, {
    key: "findInviation",
    value: function findInviation(eventId) {
      var db = getDB();
      return db.collection("users").find().toArray().then(function (result) {
        var user = result.find(function (i) {
          return i.events.find(function (p) {
            return p._id.toString() === eventId.toString();
          });
        });

        var userEvents = _toConsumableArray(user.events);

        var eventDetails = userEvents.find(function (i) {
          return i._id.toString() === eventId.toString();
        });
        return eventDetails;
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }]);

  return User;
}();

module.exports = User;