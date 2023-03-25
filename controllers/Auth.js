const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SignUp = async (req, res) => {
	const { username, password } = req.body;
	const regexuname = /^.{2,}$/;
	const regexpass = /^.{5,}$/;
	const validateUsername = regexuname.test(username);
	const validatePass = regexpass.test(password);

	if (validateUsername === false) {
		return res.status(400).json({ data: "Bad Request" });
	}
	if (validatePass === false) {
		return res.status(400).json({ data: "Bad Request" });
	}
	try {
		// find user if exist
		const findUser = await User.findOne({
			where: {
				username: username,
			},
		});
		console.log("finduser " + findUser);
		// check user if exist
		if (findUser !== null) {
			return res.status(409).json({ data: "User already exist" });
		}

		// hashing
		const hash = await bcrypt.hash(password, 10);

		const createUser = await User.create({
			username: username,
			password: hash,
		});

		const token = jwt.sign({ users_id: createUser.id }, process.env.SECRET_KEY, {
			expiresIn: "1h",
		});

		return res.status(200).json({ data: { msg: "Sign Up Succesful", token: token } });
	} catch (error) {
		return res.status(500).json({ data: "Cannot Signing Up" });
	}
};

const Login = async (req, res) => {
	const { username, password } = req.body;
	const regexuname = /^.{2,}$/;
	const regexpass = /^.{5,}$/;
	const validateUsername = regexuname.test(username);
	const validatePass = regexpass.test(password);

	if (validateUsername === false) {
		res.status(400).json({ data: "Bad Request" });
	}
	if (validatePass === false) {
		res.status(400).json({ data: "Bad Request" });
	}

	try {
		// find user
		const findUser = await User.findOne({
			where: {
				username: username,
			},
		});

		// if user not exist
		if (findUser === null || findUser === undefined) {
			return res.status(404).json({ data: "User not found" });
		}

		// verify password
		const verifyPass = await bcrypt.compare(password, findUser.password);

		if (verifyPass !== true) {
			return res.status(401).json({ data: "Wrong Password" });
		}

		const token = jwt.sign({ users_id: findUser.id }, process.env.SECRET_KEY, {
			expiresIn: "1h",
		});

		return res.status(200).json({ data: { msg: "Berhasil Login", token: token } });
	} catch (error) {
		return res.status(500).json({ data: "Gagal Login" });
	}
};

module.exports = { SignUp, Login };
