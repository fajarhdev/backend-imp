var express = require("express");
const ListUser = require("../controllers/User");
const VerifyToken = require("../middlewares/VerifyToken");
var router = express.Router();

/* GET users listing. */
router.get("/userlist", VerifyToken, ListUser);

module.exports = router;
