const S = require("sequelize");
const db = require("../db");

class Favorite extends S.Model {}

Favorite.init(
  {
    favId: { type: S.STRING },
    type: { type: S.STRING },
  },
  {
    sequelize: db,
    modelName: "favorite",
  }
);

module.exports = Favorite;
