const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const { User } = require("../models/user");
require("dotenv").config();
const { SECRET } = process.env;

const createToken = (username, id) => {
  return jwt.sign(
    {
      username,
      id
    },
    SECRET,
    {
      expiresIn: "2 days",
    }
  );
};

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username: username } });
      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );
        if (isAuthenticated) {
          let token = createToken(
            foundUser.dataValues.username,
            foundUser.dataValues.id
          );
          const exp = Date.now() + 1000 * 60 * 60 * 48;
          const DATA = {
            username: foundUser.dataValues.username,
            id: foundUser.dataValues.id,
            token: token,
            exp: exp,
          };
          res.status(200).send(DATA);
        } else {
          res.status(400).send("password is not correct");
        }
      } else {
        res.status(400).send("User does not exist");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  register: async (req, res) => {
    try {
      let { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username: username } });
      if (foundUser) {
        res.status(400).send("User already exists");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = await User.create({
          username: username,
          hashedPass: hash
        });
        let token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );
        const exp = Date.now() + 1000 * 60 * 60 * 48;

        const OBJECT = {
          username: newUser.dataValues.username,
          id: newUser.dataValues.id,
          token: token,
          exp: exp,
        };
        res.status(200).send(OBJECT);
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
