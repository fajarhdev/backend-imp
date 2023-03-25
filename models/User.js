const { DataTypes } = require("sequelize");
const Conn = require("../configs/DB");

const User = Conn.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "users",
		timestamps: true,
		paranoid: true,
	}
);

module.exports = User;
