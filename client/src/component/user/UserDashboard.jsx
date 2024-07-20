import React, { useState, useEffect, useContext } from "react";
import {
	User,
	Edit,
	Trash2,
	Star,
	Clock,
	Eye,
	MessageCircle,
	Plus,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

// Sample user data
const sampleUser = {
	id: 1,
	name: "John Doe",
	email: "john@example.com",
	bio: "Passionate learner and tech enthusiast",
	displayPicture: "/api/placeholder/100/100",
	joinedDate: "2023-01-15",
};

// Sample reviews data
const sampleReviews = [
	{
		id: 1,
		name: "Web Development Bootcamp",
		content: "Great name ! Learned a lot about modern web technologies.",
		rating: 4,
		date: "2023-03-10",
		edited: false,
		likes: 15,
		comments: 3,
	},
	{
		id: 2,
		name: "Machine Learning Fundamentals",
		content:
			"Excellent introduction to ML concepts. Could use more practical examples.",
		rating: 3,
		date: "2023-05-22",
		edited: true,
		likes: 8,
		comments: 1,
	},
	// Add more sample reviews as needed
];

const reviewsPerPage = 2;

import { UserContext } from "../../App";

function UserDashboard() {
	const [activeTab, setActiveTab] = useState("profile");
	const [reviews, setReviews] = useState(sampleReviews);
	const [editingReview, setEditingReview] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortOption, setSortOption] = useState("date");

	const { user, isLoggedIn } = useContext(UserContext);

	console.log(user);

	useEffect(() => {
		// Sort reviews based on the selected sort option
		const sortedReviews = [...reviews].sort((a, b) => {
			if (sortOption === "date")
				return new Date(b.date) - new Date(a.date);
			if (sortOption === "likes") return b.likes - a.likes;
			return 0;
		});
		setReviews(sortedReviews);
	}, [sortOption]);

	const handleReviewEdit = (reviewId) => {
		const reviewToEdit = reviews.find((review) => review.id === reviewId);
		setEditingReview(reviewToEdit);
	};

	const handleReviewUpdate = (e) => {
		e.preventDefault();
		// Implement review update logic here
		console.log("Review updated");
		setEditingReview(null);
	};

	const handleReviewDelete = (reviewId) => {
		// Implement review deletion logic here
		setReviews(reviews.filter((review) => review.id !== reviewId));
		console.log("Review deleted", reviewId);
	};

	const totalPages = Math.ceil(reviews.length / reviewsPerPage);
	const paginatedReviews = reviews.slice(
		(currentPage - 1) * reviewsPerPage,
		currentPage * reviewsPerPage
	);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="bg-white shadow-sm rounded-lg overflow-hidden">
					<div className="border-b border-gray-200">
						<nav className="-mb-px flex">
							<button
								onClick={() => setActiveTab("profile")}
								className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
									activeTab === "profile"
										? "border-indigo-500 text-indigo-600"
										: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
								}`}
							>
								Profile
							</button>
							<button
								onClick={() => setActiveTab("reviews")}
								className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
									activeTab === "reviews"
										? "border-indigo-500 text-indigo-600"
										: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
								}`}
							>
								My Reviews
							</button>
						</nav>
					</div>

					<div className="p-4 sm:p-6 lg:p-8">
						{activeTab === "profile" && (
							<div>
								<div className="flex items-center mb-6">
									<img
										src={user?.displayPicture}
										alt={user?.name}
										className="w-20 h-20 rounded-full mr-4"
									/>
									<div>
										<h2 className="text-2xl font-bold">
											{user?.name}
										</h2>
										<p className="text-gray-600">
											Joined on{" "}
											<span className="font-medium text-gray-800">
												{user?.joinedDate
													? formatDate(
															user.joinedDate
													  )
													: "N/A"}
											</span>
										</p>
									</div>
								</div>
								<div>
									<div className="mb-3">
										<span
											htmlFor="name"
											className="block text-sm font-medium text-gray-700"
										>
											Name
										</span>
										<span className="mt-2 font-medium">
											{user?.name}
										</span>
									</div>
									<div className="mb-3">
										<span
											htmlFor="email"
											className="block text-sm font-semibold text-gray-700"
										>
											Email
										</span>
										<span className="mt-2 font-medium">
											{user?.email}
										</span>
									</div>
								</div>
							</div>
						)}

						{activeTab === "reviews" && (
							<div>
								<div className="flex justify-between items-center mb-4">
									<h2 className="text-2xl font-bold">
										My Reviews
									</h2>
									<Link
										to="/create-review"
										className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
									>
										<Plus size={16} className="mr-1" />
										Create Review
									</Link>
								</div>
								<div className="mb-4">
									<label
										htmlFor="sort"
										className="block text-sm font-medium text-gray-700"
									>
										Sort by
									</label>
									<select
										id="sort"
										name="sort"
										value={sortOption}
										onChange={(e) =>
											setSortOption(e.target.value)
										}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
									>
										<option value="date">Date</option>
										<option value="likes">
											Most Liked
										</option>
									</select>
								</div>
								{paginatedReviews.map((review) => (
									<div
										key={review.id}
										className="bg-white shadow-sm rounded-lg overflow-hidden mb-4"
									>
										<div className="p-4">
											<h3 className="text-xl font-bold">
												{review.name}
											</h3>
											<p className="text-gray-700 mt-2">
												{review.content}
											</p>
											<div className="flex items-center mt-4">
												<Star
													size={16}
													className="text-yellow-500 mr-1"
												/>
												<span>{review.rating}</span>
												<Clock
													size={16}
													className="text-gray-500 ml-4 mr-1"
												/>
												<span>{review.date}</span>
												<Eye
													size={16}
													className="text-gray-500 ml-4 mr-1"
												/>
												<span>{review.likes}</span>
												<MessageCircle
													size={16}
													className="text-gray-500 ml-4 mr-1"
												/>
												<span>{review.comments}</span>
											</div>
											<div className="flex justify-end mt-4">
												<button
													onClick={() =>
														handleReviewEdit(
															review.id
														)
													}
													className="text-indigo-600 hover:text-indigo-900 mr-4"
												>
													<Edit size={16} />
												</button>
												<button
													onClick={() =>
														handleReviewDelete(
															review.id
														)
													}
													className="text-red-600 hover:text-red-900"
												>
													<Trash2 size={16} />
												</button>
											</div>
										</div>
									</div>
								))}
								<div className="flex justify-between mt-4">
									<button
										onClick={() =>
											setCurrentPage((prev) =>
												Math.max(prev - 1, 1)
											)
										}
										className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
									>
										<ChevronLeft
											size={16}
											className="mr-1"
										/>
										Previous
									</button>
									<span>
										Page {currentPage} of {totalPages}
									</span>
									<button
										onClick={() =>
											setCurrentPage((prev) =>
												Math.min(prev + 1, totalPages)
											)
										}
										className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
									>
										Next
										<ChevronRight
											size={16}
											className="ml-1"
										/>
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserDashboard;
