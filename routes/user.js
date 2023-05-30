const express = require("express");
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

module.exports = userRouter;
