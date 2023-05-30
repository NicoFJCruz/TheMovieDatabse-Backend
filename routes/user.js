const express = require("express");
const Users = require("../models/Users");
const userRouter = express.Router();
const { validateUser } = require("../tokens/validate");
const {
  getAll,
  getOne,
  register,
  login,
  logout,
} = require("../controllers/user");

userRouter.get("/", getAll);
userRouter.get("/:id", getOne);
userRouter.post("/", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);


userRouter.get("/me/:id", (req, res) => {
  Users.findByPk(Number(req.params.id)).then((one) => res.send(one));
});

userRouter.get("/:id/all", (req, res) => {
  Users.findAll().then((user) => res.send(user));
});

module.exports = userRouter;
