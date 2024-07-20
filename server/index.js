const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const logger = require("./middleware/requestLogger");

const app = express();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(logger);

// Sample route to fetch users
app.get("/users", async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.json(users);
	} catch (error) {
		res.status(500).send("Error fetching users");
	}
});

// Sample route to add a new user
app.post("/users", express.json(), async (req, res) => {
	const { name, email } = req.body;
	try {
		const newUser = await prisma.user.create({
			data: { name, email },
		});
		res.json(newUser);
	} catch (error) {
		res.status(500).send("Error creating user");
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
