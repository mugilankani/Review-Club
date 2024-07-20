const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
	const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "1d", // 1 day
	});

	return accessToken;
};

module.exports = { generateToken };
