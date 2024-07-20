// middleware/authenticate.js

const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
	const token = req.cookies.accessToken;

	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.userId; // Store user ID in request object for further use
		next();
	} catch (error) {
		return res.status(403).json({ message: "Forbidden" });
	}
};

module.exports = authenticate;
