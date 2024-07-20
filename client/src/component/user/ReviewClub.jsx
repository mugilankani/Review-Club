import React, { useEffect, useState } from 'react';
import { Search, Menu, X, Filter, ThumbsUp, MessageSquare, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Sample data
const categories = ['Web Development', 'Data Science', 'Mobile Development', 'AI/ML', 'DevOps'];

export default function ReviewClub() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Function to fetch data
    const fetchPosts = async () => {
      try {
        const response = axios.get('/allposts')
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to='/' className="text-2xl font-bold text-indigo-600 cursor-pointer">Review Club</Link>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/dashboard" className="hidden lg:ml-6 lg:flex lg:items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="/api/placeholder/40/40"
                    alt="User avatar"
                  />
                </div>
                <span className="ml-3 text-gray-700">John Doe</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block lg:w-64 mr-8`}>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <ul>
                <li
                  className={`cursor-pointer py-2 px-3 rounded-md ${
                    selectedCategory === 'All' ? 'bg-indigo-100 text-indigo-800' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory('All')}
                >
                  All
                </li>
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`cursor-pointer py-2 px-3 rounded-md ${
                      selectedCategory === category ? 'bg-indigo-100 text-indigo-800' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedCategory(category)}
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
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <button className="ml-4 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Filter size={20} />
              </button>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {Array.isArray(posts) ? (
                posts.map((review) => (
                  <div key={review.id} className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <img
                          src="/api/placeholder/40/40"
                          alt={`${review.user}'s avatar`}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <h3 className="font-semibold">{review.user}</h3>
                          <p className="text-sm text-gray-500">{review.name}</p>
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
                        <img key={index} src={img} alt={`Review image ${index + 1}`} className="w-1/2 rounded-lg" />
                      ))}
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-600 hover:text-indigo-600">
                        <ThumbsUp size={20} className="mr-1" />
                        <span>{review.likes}</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-indigo-600">
                        <MessageSquare size={20} className="mr-1" />
                        <span>{review.comments}</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-red-600">
                        <Flag size={20} className="mr-1" />
                        <span>Report</span>
                      </button>
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
