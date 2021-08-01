const User = require("../models/user");
const ObjectId = require("mongodb").ObjectId;

exports.getAdminPage = (req, res, next) => {
  const userId = req.params.userId;
  User.filterOne(userId)
    .then((result) => {
      res.render("admin/dashboard", { userEvents: result.events, userId });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddEvent = (req, res, next) => {
  const productId = req.body.userId;
  res.render("admin/add-event", { id: productId });
};

exports.postAddEvent = (req, res, next) => {
  const _id = ObjectId();
  const title = req.body.title;
  const description = req.body.description;
  const host = req.body.host;
  const time = req.body.time.toString();
  const server = req.body.server;
  const banner = req.body.banner;
  const video = req.body.video;
  const facebook = req.body.facebook;
  const instagram = req.body.instagram;
  const user = req.body.userId;

  User.addEvent(user, {
    _id,
    title,
    description,
    host,
    time,
    server,
    banner,
    video,
    facebook,
    instagram,
  })
    .then((result) => {
      console.log(result);
      res.redirect(`/admin/${user}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditEvent = (req, res, next) => {
  const user = req.params.userId;
  const eventId = req.params.eventId;
  User.filterOne(user)
    .then((result) => {
      const eventDetails = result.events.find((i) => {
        return i._id.toString() === eventId.toString();
      });
      res.render("admin/edit-event", { eventDetails, user });
      console.log(req.user);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditEvent = (req, res, next) => {
  const _id = req.body.eventId;
  const title = req.body.title;
  const description = req.body.description;
  const host = req.body.host;
  const time = req.body.time.toString();
  const server = req.body.server;
  const banner = req.body.banner;
  const video = req.body.video;
  const facebook = req.body.facebook;
  const instagram = req.body.instagram;
  const user = req.body.userId;

  User.editEvent(user, {
    _id,
    title,
    description,
    host,
    time,
    server,
    banner,
    video,
    facebook,
    instagram,
  })
    .then((result) => {
      console.log(result);
      res.redirect(`/admin/${user}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDeleteEvent = (req, res, next) => {
  const userId = req.params.userId;
  const eventId = req.params.eventId;

  User.deleteEvent(userId, eventId)
    .then((result) => {
      console.log(result);
      res.redirect(`/admin/${userId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

