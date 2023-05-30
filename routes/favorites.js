const express = require("express");
const favRouter = express.Router();
const {
  getFavUser,
  createFavs,
  deleteFavs,
} = require("../controllers/favorites");

favRouter.get("/:idUser", getFavUser);
favRouter.post("/:idUser", createFavs);
favRouter.post("/remove/:idUser", deleteFavs);

module.exports = favRouter;
