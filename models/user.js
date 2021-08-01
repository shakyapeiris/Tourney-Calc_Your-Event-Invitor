const getDB = require("../utils/database").getDB;
const objectId = require("mongodb").ObjectId;

class User {
  static filterOne(userId) {
    const db = getDB();
    return db.collection("users").findOne({ _id: new objectId(userId) });
  }
  static register() {
    const db = getDB();
    return db.collection("users").insertOne({ events: [] });
  }
  static addEvent(userId, event) {
    const db = getDB();
    return this.filterOne(userId)
      .then((result) => {
        const events = result.events;
        events.push(event);
        return db
          .collection("users")
          .updateOne(
            { _id: new objectId(userId) },
            { $set: { events: events } }
          );
      })
      .catch((err) => {
        return console.log(err);
      });
  }

  static deleteEvent(userId, event) {
    const db = getDB();
    return this.filterOne(userId)
      .then((result) => {
        const events = result.events.filter((i) => {
          return i._id.toString() != event.toString();
        });
        return db
          .collection("users")
          .updateOne(
            { _id: new objectId(userId) },
            { $set: { events: events } }
          );
      })
      .catch((err) => {
        return console.log(err);
      });
  }

  static editEvent(userId, event) {
    const db = getDB();
    return this.filterOne(userId)
      .then((result) => {
        console.log("EventID", event._id);
        console.log();
        const eventIndex = result.events.findIndex((i) => {
          return i._id.toString() === event._id.toString();
        });
        let events = [...result.events];
        events[eventIndex] = event;
        return db
          .collection("users")
          .updateOne(
            { _id: new objectId(userId) },
            { $set: { events: events } }
          );
      })
      .catch((err) => {
        return console.log(err);
      });
  }

  static findInviation(eventId) {
    const db = getDB();
    return db
      .collection("users")
      .find()
      .toArray()
      .then((result) => {
        const user = result.find((i) => {
          return i.events.find((p) => {
            return p._id.toString() === eventId.toString();
          });
        });
        const userEvents = [...user.events];
        const eventDetails = userEvents.find((i) => {
          return i._id.toString() === eventId.toString();
        });
        return eventDetails;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
