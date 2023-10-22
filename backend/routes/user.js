const express = require("express");
const controller = require("../controllers");

const router = express.Router();

router.post("/signup", controller.user.auth.signup);

module.exports = router;
