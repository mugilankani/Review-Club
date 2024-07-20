require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const logger = require("./middleware/requestLogger");
const cookieParser = require("cookie-parser");

const {
	generateGoogleOauthLink,
	googleOauthCallback,
} = require("./googleAuth");
const authenticate = require("./middleware/authenticate");

const app = express();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

// Middleware
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		optionsSuccessStatus: 200,
		credentials: true,
	})
);
app.use(logger);
app.use(cookieParser());

app.get("/auth/google", generateGoogleOauthLink);
app.get("/auth/google/callback", googleOauthCallback);

app.get("/auth", authenticate, async (req, res) => {
	const userId = req.userId;

	const user = await prisma.user.findUnique({
		where: { id: userId },
	});

	res.json(user);
});

// Fetch all posts
app.get("/allposts", async (req, res) => {
	try {
		const posts = await prisma.review.findMany({
			include: { user: true },
		});
		console.log(posts);
		res.json(posts);
	} catch (error) {
		console.error("Error fetching posts:", error);
		res.status(500).send("Error fetching posts");
	}
});

// Create a new post
app.post("/post", async (req, res) => {
	const { userId, name, content, images } = req.body;

	// Validate the input
	if (!userId || !name || !content) {
		return res.status(400).send("User ID, name, and content are required");
	}

	try {
		const newPost = await prisma.review.create({
			data: {
				userId,
				name,
				content,
				images: images || [],
			},
		});
		res.status(201).json(newPost); // Respond with the created post and status code 201 (Created)
	} catch (error) {
		console.error("Error creating post:", error);
		res.status(500).send("Error creating post");
	}
});

// Fetch a single post by ID
app.get("/post/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const post = await prisma.review.findUnique({
			where: { id },
			include: { user: true },
		});
		if (post) {
			res.json(post);
		} else {
			res.status(404).send("Post not found");
		}
	} catch (error) {
		console.error("Error fetching post:", error);
		res.status(500).send("Error fetching post");
	}
});

// Delete a post by ID
app.delete("/post/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await prisma.review.delete({
			where: { id },
		});
		res.status(204).send(); // No content, successful deletion
	} catch (error) {
		console.error("Error deleting post:", error);
		res.status(500).send("Error deleting post");
	}
});

// Approve a post by ID (Admin functionality)
app.get("/admin/post/approve/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const post = await prisma.review.update({
			where: { id },
			data: { approved: true },
		});
		res.json(post);
	} catch (error) {
		console.error("Error approving post:", error);
		res.status(500).send("Error approving post");
	}
});

// Reject a post by ID (Admin functionality)
app.get("/admin/post/reject/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const post = await prisma.review.update({
			where: { id },
			data: { approved: false },
		});
		res.json(post);
	} catch (error) {
		console.error("Error rejecting post:", error);
		res.status(500).send("Error rejecting post");
	}
});

// Delete a post by ID (Admin functionality)
app.delete("/admin/post/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await prisma.review.delete({
			where: { id },
		});
		res.status(204).send();
	} catch (error) {
		console.error("Error deleting post:", error);
		res.status(500).send("Error deleting post");
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
