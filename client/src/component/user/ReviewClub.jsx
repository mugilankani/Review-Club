import React, { useEffect, useState } from "react";
import {
	Search,
	Menu,
	X,
	Filter,
	ThumbsUp,
	MessageSquare,
	Flag,
} from "lucide-react";
import axios from "axios";

// Sample data
const categories = [
	"Web Development",
	"Data Science",
	"Mobile Development",
	"AI/ML",
	"DevOps",
];

export default function ReviewClub() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Function to fetch data
		const fetchPosts = async () => {
			try {
				const response = await axios.get(
					"http://localhost:3000/allposts"
				);
				setPosts(response.data);
				console.log(response.data)
			} catch (error) {
				console.error("Error fetching posts:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex flex-col lg:flex-row gap-8">
					<div
						className={`${
							sidebarOpen ? "block" : "hidden"
						} lg:block lg:w-64 w-full mr-8`}
					>
						
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
						<div className="space-y-6 h-[90dvh] overflow-y-auto">
							{loading ? (
								<p>Loading reviews...</p>
							) : posts.length ? (
								posts.map((review) => (
									<div
										key={review.id}
										className="bg-white shadow-md rounded-lg p-6"
									>
										<div className="flex items-center justify-between mb-4">
											<div className="flex items-center">
												<img
													src={
														review.user
															.displayPicture
													}
													alt={`${review.user.name}'s avatar`}
													className="w-10 h-10 rounded-full mr-3"
												/>
												<div>
													<h3 className="font-semibold">
														{review.user.name}
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
										
									</div>
								))
							) : (
								<p>No reviews available.</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
