const Conn = require("../configs/DB");
const User = require("../models/User");

const Sync = () => {
	User.sync();
};

try {
	Conn.authenticate();
	console.log("Connection has been established successfully.");
	Sync();
	Assoc();
} catch (error) {
	console.error("Unable to connect to the database:", error);
}
