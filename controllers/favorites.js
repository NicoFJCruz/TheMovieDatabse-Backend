const Sequelize = require("sequelize");
const { User, Favorite } = require("../models");

const getFavUser = async (req, res, next) => {
  try {
    const favs = await Favorite.findAll({
      where: { userId: req.params.idUser },
    });

    if (!favs[0]) {
      return res.status(404).send("No ha guardado ningún favorito.");
    }

    res.status(200).send(favs);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createFavs = async (req, res, next) => {
  try {
    const { favId, type } = req.body;
    const user = await User.findByPk(req.params.idUser);
    const favExists = await Favorite.findOne({
      where: { userId: user.id, favId },
    });

    if (favExists) {
      return res.send("Favorito ya añadido");
    }
    const fav = await Favorite.create({ favId, type });
    fav.setUser(user);

    res.status(200).send(fav);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteFavs = async (req, res, next) => {
  try {
    const { favId } = req.body;
    const user = await User.findByPk(req.params.idUser);

    const favExists = await Favorite.findOne({
      where: { userId: user.id, favId },
    });

    if (!favExists) {
      return res.status(404).send("Favorito no encontrado.");
    }

    favExists.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { getFavUser, createFavs, deleteFavs };
