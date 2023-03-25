var express = require("express");
const { SignUp, Login } = require("../controllers/Auth");
var router = express.Router();

/* GET users listing. */
router.post("/signup", SignUp);
router.post("/login", Login);

module.exports = router;
