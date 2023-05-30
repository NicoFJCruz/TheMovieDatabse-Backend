const Sequelize = require("sequelize");
const { generateToken } = require("../tokens/token");
const { User } = require("../models");

const register = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;

    const [user, created] = await User.findOrCreate({
      where: { email: email },
      defaults: { name, lastName, email, password },
    });

    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findByEmail(email);
    if (!userExists) {
      return res.status(404).send("Usuario no existente");
    }

    const validate = await userExists.validatePassword(password);

    if (validate) {
      let token = generateToken({ email });
      res.cookie("token", token).send(userExists);
    } else {
      res.status(401).send({ error: "Password incorrect" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).send({});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { getAll, getOne, register, login, logout };
