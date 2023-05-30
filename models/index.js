const db = require("../db");
const User = require("./Users");
const Favorite = require("./Favorites");

User.hasMany(Favorite)
Favorite.belongsTo(User)

module.exports = { User, Favorite };
