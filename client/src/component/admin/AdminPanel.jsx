import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  CheckSquare,
  BarChart2,
  Settings,
  Search,
  Eye,
} from "lucide-react";
import PostModal from "./PostModel"; 

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalReviews: 0,
    pendingReviews: 0,
    averageRating: 0,
  });
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));

    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/reviews`)
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((error) => console.error("Error fetching reviews:", error));

    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/analytics`)
      .then((response) => setAnalytics(response.data))
      .catch((error) => console.error("Error fetching analytics:", error));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false
  );
  const filteredReviews = reviews.filter(
    (review) =>
      review?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      review?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false
  );
  const handleApproveReview = (id) => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/admin/reviews/${id}/approve`)
      .then((response) => {
        setReviews(
          reviews.map((review) => (review.id === id ? response.data : review))
        );
        setSelectedPostId(null);
      })
      .catch((error) => console.error("Error approving review:", error));
  };

  const handleRejectReview = (id) => {
    axios
      .put(`${import.meta.env.VITE_API_URL}/admin/reviews/${id}/reject`)
      .then((response) => {
        setReviews(
          reviews.map((review) => (review.id === id ? response.data : review))
        );
        setSelectedPostId(null);
      })
      .catch((error) => console.error("Error rejecting review:", error));
  };

  const handleDeleteReview = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/admin/reviews/${id}`)
      .then(() => {
        setReviews(reviews.filter((review) => review.id !== id));
        setSelectedPostId(null);
      })
      .catch((error) => console.error("Error deleting review:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#242E34] min-h-screen p-4">
          <h1 className="text-white text-2xl font-bold mb-8">
            Review Club Admin
          </h1>
          <nav>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center text-white mb-4 p-2 w-full rounded-md ${
                activeTab === "users" ? "bg-indigo-900" : "hover:bg-indigo-950"
              }`}
            >
              <Users className="mr-2" />
              Users
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex items-center text-white mb-4 p-2 w-full rounded-md ${
                activeTab === "reviews"
                  ? "bg-indigo-900"
                  : "hover:bg-indigo-950"
              }`}
            >
              <CheckSquare className="mr-2" />
              Review Approvals
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center text-white mb-4 p-2 w-full rounded-md ${
                activeTab === "analytics"
                  ? "bg-indigo-900"
                  : "hover:bg-indigo-950"
              }`}
            >
              <BarChart2 className="mr-2" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center text-white mb-4 p-2 w-full rounded-md ${
                activeTab === "settings"
                  ? "bg-indigo-900"
                  : "hover:bg-indigo-950"
              }`}
            >
              <Settings className="mr-2" />
              Settings
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              {activeTab === "users" && "User Management"}
              {activeTab === "reviews" && "Review Approvals"}
              {activeTab === "analytics" && "Analytics"}
              {activeTab === "settings" && "Settings"}
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {activeTab === "users" && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined Date
                    </th>
                   
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(user.joinedDate).toLocaleDateString()}
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReviews.map((review) => (
                    <tr key={review.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={review.user.displayPicture}
                            alt={review.user.name}
                          />
                          <span className="ml-2">{review.user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {review.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            review.approved
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {review.approved ? "Approved" : "Not Approved"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedPostId(review.id)}
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          <Eye size={18} />
                        </button>
                        {!review.approved && (
                          <button
                            onClick={() => handleApproveReview(review.id)}
                            className="text-green-600 hover:text-green-900 mr-2"
                          >
                            Approve
                          </button>
                        )}
                        {review.approved && (
                          <button
                            onClick={() => handleRejectReview(review.id)}
                            className="text-yellow-600 hover:text-yellow-900 mr-2"
                          >
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="bg-white shadow-md rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-indigo-100 rounded-lg text-center">
                  <h3 className="text-xl font-bold mb-2">Total Users</h3>
                  <p className="text-3xl">{analytics.totalUsers}</p>
                </div>
                <div className="p-6 bg-green-100 rounded-lg text-center">
                  <h3 className="text-xl font-bold mb-2">Total Reviews</h3>
                  <p className="text-3xl">{analytics.totalReviews}</p>
                </div>
                <div className="p-6 bg-yellow-100 rounded-lg text-center">
                  <h3 className="text-xl font-bold mb-2">Pending Reviews</h3>
                  <p className="text-3xl">{analytics.pendingReviews}</p>
                </div>
                <div className="p-6 bg-blue-100 rounded-lg text-center">
                  <h3 className="text-xl font-bold mb-2">Average Rating</h3>
                  <p className="text-3xl">{analytics.averageRating}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white shadow-md rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Settings</h3>
              <p>Settings content goes here...</p>
            </div>
          )}
        </div>
      </div>
      {selectedPostId && (
        <PostModal
          postId={selectedPostId}
          onClose={() => setSelectedPostId(null)}
          onApprove={handleApproveReview}
          onReject={handleRejectReview}
          onDelete={handleDeleteReview}
        />
      )}
    </div>
  );
}
