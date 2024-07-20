require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const multer = require('multer');

const logger = require("./middleware/requestLogger");
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
app.use(cors());
app.use(logger);

app.get("/auth/google", generateGoogleOauthLink);
app.get("/auth/google/callback", googleOauthCallback);

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
		res.json(posts); // Ensure this sends JSON
	} catch (error) {
		console.error("Error fetching posts:", error);
		res.status(500).json({ message: "Error fetching posts" }); // Return JSON error message
	}
});


// Create a new post
app.post('/post', upload.array('images', 4), async (req, res) => {
	const { name, content, rating, date, edited, likes, comments } = req.body;
	const images = req.files ? req.files.map(file => file.buffer.toString('base64')) : [];
  
	// Validate the input
	if (!name || !content || rating == null) {
	  return res.status(400).send('Name, content, and rating are required');
	}
  
	try {
	  const newPost = await prisma.review.create({
		data: {
		  name,
		  content,
		  rating: parseInt(rating),
		  date,
		  edited: edited === 'true',
		  likes: parseInt(likes),
		  comments: parseInt(comments),
		  images,
		},
	  });
	  res.status(201).json(newPost);
	} catch (error) {
	  console.error('Error creating post:', error);
	  res.status(500).send('Error creating post');
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
