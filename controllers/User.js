const { QueryTypes } = require("sequelize");
const Conn = require("../configs/DB");
const User = require("../models/User");

const ListUser = async (req, res) => {
	const users_id = req.users_id;
	const { page, limit } = req.query;

	try {
		// get count of user
		const countUser = await User.findAndCountAll();

		// pagination options
		const limits = limit ? parseInt(limit) : 10;
		const offsets = page ? (page - 1 < 0 ? 0 : (page - 1) * limits) : 0;
		const totalPages = Math.ceil(countUser.count / limits);
		const currentPage = Math.ceil(offsets / limits) + 1;

		const listUser = await Conn.query(`SELECT * from users LIMIT ${limits} OFFSET ${offsets}`, {
			type: QueryTypes.SELECT,
		});

		return res
			.status(200)
			.json({ data: { total_pages: totalPages, current_page: currentPage, users: listUser } });
	} catch (error) {
		return res.status(500).json({ data: "Failed to get data" });
	}
};

module.exports = ListUser;
