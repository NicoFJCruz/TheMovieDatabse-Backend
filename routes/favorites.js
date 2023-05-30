const express = require("express");
const { where } = require("sequelize");
const { User, Favorite } = require("../models");

const favRouter = express.Router();

favRouter.get("/:idUser/:type", (req, res) => {
  Favorite.findAll({
    where: {
      userId: req.params.idUser,
      type: req.params.type,
    },
  }).then((all) => res.send(all));
});

favRouter.post("/:idUser", (req, res) => {
  const { favId, type } = req.body;
  const userId = req.params.idUser;

  Favorite.findOne({
    where: {
      userId: req.params.idUser,
      favId,
    },
  }).then((one) => {
    if (one) {
      res.send("Ya añadido");
    } else {
      Favorite.create({ userId, favId, type }).then((fav) => {
        res.send(fav);
      });
    }
  });
});

favRouter.post("/:idUser/remove", (req, res) => {
  const { favId } = req.body;
  const userId = req.params.idUser;
  let favEliminar = {};

  Favorite.findOne({
    where: {
      userId: req.params.idUser,
      favId,
    },
  }).then((one) => {
    favEliminar = one;
    Favorite.destroy({
      where: {
        userId,
        favId,
      },
    }).then(() => {
      res.send(favEliminar);
    });
  });
});

module.exports = favRouter;
