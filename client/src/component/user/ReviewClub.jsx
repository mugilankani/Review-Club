import React, { useContext, useState } from "react";
import {
	Search,
	Menu,
	X,
	Filter,
	ThumbsUp,
	MessageSquare,
	Flag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const sampleReviews = [
	{
		id: 1,
		user: "John Doe",
		name: "Web Development Bootcamp",
		content:
			"This name did not deliver on its promises. The curriculum was outdated and the support was lacking.",
		images: ["/api/placeholder/400/300"],
		approved: true,
		likes: 24,
		comments: 5,
	},
	{
		id: 2,
		user: "Jane Smith",
		name: "Data Science Masterclass",
		content:
			"Great name content, but the pacing was too fast. Not suitable for beginners as advertised.",
		images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
		approved: false,
		likes: 12,
		comments: 3,
	},
	// Add more sample reviews here
];

const categories = [
	"Web Development",
	"Data Science",
	"Mobile Development",
	"AI/ML",
	"DevOps",
];

export default function ReviewClub() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const { user, isLoggedIn } = useContext(UserContext);

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex flex-col lg:flex-row gap-8">
					<div
						className={`${
							sidebarOpen ? "block" : "hidden"
						} lg:block lg:w-64 w-full mr-8`}
					>
						<div className="bg-white shadow-md rounded-lg p-4">
							<h2 className="text-lg font-semibold mb-4">
								Categories
							</h2>
							<ul>
								<li
									className={`cursor-pointer py-2 px-3 rounded-md ${
										selectedCategory === "All"
											? "bg-indigo-100 text-indigo-800"
											: "hover:bg-gray-100"
									}`}
									onClick={() => setSelectedCategory("All")}
								>
									All
								</li>
								{categories.map((category) => (
									<li
										key={category}
										className={`cursor-pointer py-2 px-3 rounded-md ${
											selectedCategory === category
												? "bg-indigo-100 text-indigo-800"
												: "hover:bg-gray-100"
										}`}
										onClick={() =>
											setSelectedCategory(category)
										}
									>
										{category}
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Feed */}
					<div className="flex-1">
						{/* Search and filter */}
						<div className="mb-6 flex items-center">
							<div className="relative flex-1">
								<input
									type="text"
									placeholder="Search reviews..."
									className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
								<Search
									className="absolute left-3 top-2.5 text-gray-400"
									size={20}
								/>
							</div>
							<button className="ml-4 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								<Filter size={20} />
							</button>
							<button
								onClick={() => setSidebarOpen(!sidebarOpen)}
								className="p-2 ml-4 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
							>
								{sidebarOpen ? (
									<X size={24} />
								) : (
									<Menu size={24} />
								)}
							</button>
						</div>

						{/* Reviews */}
						<div className="space-y-6">
							{sampleReviews.map((review) => (
								<div
									key={review.id}
									className="bg-white shadow-md rounded-lg p-6"
								>
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center">
											<img
												src="/api/placeholder/40/40"
												alt={`${review.user}'s avatar`}
												className="w-10 h-10 rounded-full mr-3"
											/>
											<div>
												<h3 className="font-semibold">
													{review.user}
												</h3>
												<p className="text-sm text-gray-500">
													{review.name}
												</p>
											</div>
										</div>
										{review.approved && (
											<span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
												Admin Approved
											</span>
										)}
									</div>
									<p className="mb-4">{review.content}</p>
									<div className="flex space-x-2 mb-4">
										{review.images.map((img, index) => (
											<img
												key={index}
												src={img}
												alt={`Review image ${
													index + 1
												}`}
												className="w-1/2 rounded-lg"
											/>
										))}
									</div>
									<div className="flex items-center space-x-4">
										<button className="flex items-center text-gray-600 hover:text-indigo-600">
											<ThumbsUp
												size={20}
												className="mr-1"
											/>
											<span>{review.likes}</span>
										</button>
										<button className="flex items-center text-gray-600 hover:text-indigo-600">
											<MessageSquare
												size={20}
												className="mr-1"
											/>
											<span>{review.comments}</span>
										</button>
										<button className="flex items-center text-gray-600 hover:text-red-600">
											<Flag size={20} className="mr-1" />
											<span>Report</span>
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
