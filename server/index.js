require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const logger = require("./middleware/requestLogger");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const {
	generateGoogleOauthLink,
	googleOauthCallback,
} = require("./googleAuth");
const authenticate = require("./middleware/authenticate");

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ storage: multer.memoryStorage() });
const prisma = new PrismaClient();

// Middleware
app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		optionsSuccessStatus: 200,
		credentials: true,
	})
);
app.use(express.json());
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

// routes
app.get("/login", (req, res) => {
	res.send("Login page");
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
		res.status(500).json({ message: "Error fetching posts" }); // Return JSON error message
	}
});

// Create a new post
app.post("/post", upload.array("images", 4), async (req, res) => {
	const { name, content, rating, date, edited, likes, comments } = req.body;
	const images = req.files
		? req.files.map((file) => file.buffer.toString("base64"))
		: [];

	// Validate the input
	if (!name || !content || rating == null) {
		return res.status(400).send("Name, content, and rating are required");
	}

	try {
		const newPost = await prisma.review.create({
			data: {
				name,
				content,
				rating: parseInt(rating),
				date,
				edited: edited === "true",
				likes: parseInt(likes),
				comments: parseInt(comments),
				images,
			},
		});
		res.status(201).json(newPost);
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

app.get("/admin/users", async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Error fetching users" });
	}
});

// Fetch user by ID
app.get("/admin/users/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: { id },
			include: { reviews: true },
		});
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error("Error fetching user:", error);
		res.status(500).json({ message: "Error fetching user" });
	}
});

// Update user
app.put("/admin/users/:id", async (req, res) => {
	const { id } = req.params;
	const { name, email, bio, avatar } = req.body;
	try {
		const updatedUser = await prisma.user.update({
			where: { id },
			data: { name, email, bio, avatar },
		});
		res.json(updatedUser);
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ message: "Error updating user" });
	}
});

// Delete user
app.delete("/admin/users/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await prisma.user.delete({
			where: { id },
		});
		res.status(204).send();
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(500).json({ message: "Error deleting user" });
	}
});

// Fetch all reviews (with pagination)
app.get("/admin/reviews", async (req, res) => {
	const { page = 1, limit = 10, status } = req.query;
	const skip = (page - 1) * limit;

	try {
		const where = {};
		if (status) {
			where.approved = status === "approved";
		}

		const reviews = await prisma.review.findMany({
			where,
			include: { user: true },
			skip: Number(skip),
			take: Number(limit),
			orderBy: { createdAt: "desc" },
		});

		const total = await prisma.review.count({ where });

		res.json({
			reviews,
			currentPage: Number(page),
			totalPages: Math.ceil(total / limit),
			totalReviews: total,
		});
	} catch (error) {
		console.error("Error fetching reviews:", error);
		res.status(500).json({ message: "Error fetching reviews" });
	}
});

// Approve a review
app.put("/admin/reviews/:id/approve", async (req, res) => {
	const { id } = req.params;
	try {
		const updatedReview = await prisma.review.update({
			where: { id },
			data: { approved: true },
		});
		res.json(updatedReview);
	} catch (error) {
		console.error("Error approving review:", error);
		res.status(500).json({ message: "Error approving review" });
	}
});

// Reject a review
app.put("/admin/reviews/:id/reject", async (req, res) => {
	const { id } = req.params;
	try {
		const updatedReview = await prisma.review.update({
			where: { id },
			data: { approved: false },
		});
		res.json(updatedReview);
	} catch (error) {
		console.error("Error rejecting review:", error);
		res.status(500).json({ message: "Error rejecting review" });
	}
});

// Delete a review
app.delete("/admin/reviews/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await prisma.review.delete({
			where: { id },
		});
		res.status(204).send();
	} catch (error) {
		console.error("Error deleting review:", error);
		res.status(500).json({ message: "Error deleting review" });
	}
});

// Fetch analytics data
app.get("/admin/analytics", async (req, res) => {
	res.json({ message: "Test endpoint is working" });
});

// Start the server
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
