const express = require("express");
const router = express.Router();
const user = require("./user");
const favorites = require("./favorites");

router.use("/fav", favorites);
router.use("/users", user);

module.exports = router;
