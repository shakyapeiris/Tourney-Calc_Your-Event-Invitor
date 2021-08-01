const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  res.render("client/login");
};



exports.postLogin = (req, res, next) => {
  User.filterOne(req.body.token)
    .then((result) => {
      if (result) {
        req.userId = req.body.token;
        res.redirect(`/admin/${req.userId}`)
        next();
      } else {
        console.log("Wrong Credentials");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.register = (req, res, next) => {
  User.register()
    .then((result) => {
      res.render('client/register', {id: result.insertedId})
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getInvitation = (req, res, next) => {
  const eventId = req.params.eventId;
  const reciever = req.query.reciever;
  User.findInviation(eventId).then(result => {
    res.render('client/event', {details: result, to: reciever})
  }).catch(err => {
    console.log(err)
  })
}
