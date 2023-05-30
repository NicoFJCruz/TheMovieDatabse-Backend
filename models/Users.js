const S = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class User extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (hash) => hash === this.password
    );
  }

  static findByEmail(email) {
    return User.findOne({ where: { email } });
  }
}

User.init(
  {
    fullname: { type: S.STRING },
    email: { type: S.STRING, validate: { isEmail: true } },
    password: { type: S.STRING },
    salt: { type: S.STRING },
  },
  {
    sequelize: db,
    modelName: "users",
  }
);

User.addHook("beforeCreate", (user) => {
  const salt = bcrypt.genSaltSync(9);
  user.salt = salt;
  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});

module.exports = User;
