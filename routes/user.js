const express = require("express");
const Users = require("../models/Users");
const userRouter = express.Router();
const { generateToken, validateToken } = require("../tokens/token");
const { validateUser } = require("../tokens/validate");

userRouter.post("/", (req, res) => {
  const { fullname, email, password } = req.body;
  Users.create({ fullname, email, password }).then((content) => {
    res.send(content);
  });
});

userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  Users.findByEmail(email)
    .then((user) => {
      user.validatePassword(password).then((validate) => {
        if (validate) {
          let token = generateToken({ email });
          res.cookie("token", token).send(user);
        } else {
          res.status(401).send({ error: "Password incorrect" });
        }
      });
    })
    .catch(() => {
      res.status(401).send({ error: "Email incorrect" });
    });
});

userRouter.post("/logout", validateUser, (req, res) => {
  res.clearCookie("token");
  res.status(200).send({});
});

userRouter.get("/:id", (req, res) => {
  Users.findByPk(Number(req.params.id)).then((user) => res.send(user));
});

userRouter.get("/:id/all", (req, res) => {
  Users.findAll().then((user) => res.send(user));
});

userRouter.get("/me/:id", (req, res) => {
  Users.findByPk(Number(req.params.id)).then((one) => res.send(one));
});

module.exports = userRouter;
