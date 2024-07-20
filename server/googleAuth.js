const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("./helpers/generateToken");

const prisma = new PrismaClient();

const oAuth2Client = new OAuth2Client(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	`${process.env.API_URL}/auth/google/callback`
);

const generateGoogleOauthLink = async (req, res) => {
	const authorizeUrl = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		scope: "https://www.googleapis.com/auth/userinfo.profile email openid",
	});

	res.json({ url: authorizeUrl });
};

const getUserData = async (accessToken) => {
	const response = await fetch(
		`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
	);

	return response.json();
};

const googleOauthCallback = async (req, res) => {
	const { code } = req.query;

	try {
		const { tokens } = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(tokens);

		const { email, name, picture } = await getUserData(
			oAuth2Client.credentials.access_token
		);

		let user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			user = await prisma.user.create({
				data: {
					name,
					email,
					provider: "google",
					displayPicture: picture,
				},
			});
		}

		const accessToken = await generateToken(user.id);

		res.cookie("accessToken", accessToken, {
			maxAge: 24 * 60 * 60 * 1000, // 1 day
			httpOnly: true,
			secure: true,
		});

		res.redirect(303, `${process.env.FRONTEND_URL}/auth/success`);
	} catch (error) {
		console.error("Error logging in with OAuth2 user", error);
		res.redirect(
			303,
			`${process.env.FRONTEND_URL}/auth/google?status=failed`
		);
	}
};

module.exports = { generateGoogleOauthLink, googleOauthCallback };
