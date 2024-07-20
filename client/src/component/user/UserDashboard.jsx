import React, { useState } from 'react';
import { User, Edit, Trash2, Star, Clock, Eye, MessageCircle } from 'lucide-react';

// Sample user data
const sampleUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Passionate learner and tech enthusiast',
  avatar: '/api/placeholder/100/100',
  joinedDate: '2023-01-15',
};

// Sample reviews data
const sampleReviews = [
  {
    id: 1,
    course: 'Web Development Bootcamp',
    content: 'Great course! Learned a lot about modern web technologies.',
    rating: 4,
    date: '2023-03-10',
    edited: false,
    likes: 15,
    comments: 3,
  },
  {
    id: 2,
    course: 'Machine Learning Fundamentals',
    content: 'Excellent introduction to ML concepts. Could use more practical examples.',
    rating: 3,
    date: '2023-05-22',
    edited: true,
    likes: 8,
    comments: 1,
  },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(sampleUser);
  const [reviews, setReviews] = useState(sampleReviews);
  const [editingReview, setEditingReview] = useState(null);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Implement profile update logic here
    console.log('Profile updated');
  };

  const handleReviewEdit = (reviewId) => {
    const reviewToEdit = reviews.find(review => review.id === reviewId);
    setEditingReview(reviewToEdit);
  };

  const handleReviewUpdate = (e) => {
    e.preventDefault();
    // Implement review update logic here
    console.log('Review updated');
    setEditingReview(null);
  };

  const handleReviewDelete = (reviewId) => {
    // Implement review deletion logic here
    console.log('Review deleted', reviewId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Reviews
              </button>
              <button
                onClick={() => setActiveTab('feed')}
                className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'feed'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Feed
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center mb-6">
                  <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mr-4" />
                  <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-gray-600">Joined on {user.joinedDate}</p>
                  </div>
                </div>
                <form onSubmit={handleProfileUpdate}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="3"
                      value={user.bio}
                      onChange={(e) => setUser({ ...user, bio: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{review.course}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                        ))}
                      </div>
                    </div>
                    {editingReview && editingReview.id === review.id ? (
                      <form onSubmit={handleReviewUpdate}>
                        <textarea
                          value={editingReview.content}
                          onChange={(e) => setEditingReview({ ...editingReview, content: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          rows="3"
                        ></textarea>
                        <div className="mt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => setEditingReview(null)}
                            className="mr-2 py-1 px-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <p className="text-gray-600 mb-2">{review.content}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            <span>{review.date}</span>
                            {review.edited && <span className="ml-2 text-xs">(edited)</span>}
                          </div>
                          <div>
                            <button
                              onClick={() => handleReviewEdit(review.id)}
                              className="mr-2 text-indigo-600 hover:text-indigo-800"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleReviewDelete(review.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'feed' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Feed</h2>
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white border border-gray-200 p-4 rounded-lg mb-4 shadow-sm">
                    <div className="flex items-center mb-2">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-2" />
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-500">Reviewed {review.course}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{review.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-400 mr-1" />
                        <span>{review.rating}/5</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Eye size={16} className="mr-1" />
                          {review.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle size={16} className="mr-1" />
                          {review.comments}
                        </span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}