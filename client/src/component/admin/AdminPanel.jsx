import React, { useState } from 'react';
import { Users, CheckSquare, BarChart2, Settings, Search } from 'lucide-react';

// Sample data
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Moderator', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
];

const sampleReviews = [
  { id: 1, user: 'John Doe', name: 'Web Development Bootcamp', status: 'Pending' },
  { id: 2, user: 'Jane Smith', name: 'Data Science Masterclass', status: 'Approved' },
  { id: 3, user: 'Bob Johnson', name: 'Mobile App Development', status: 'Rejected' },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = sampleUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReviews = sampleReviews.filter(review => 
    review.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#242E34] min-h-screen p-4">
          <h1 className="text-white text-2xl font-bold mb-8">Review Club Admin</h1>
          <nav>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center text-white mb-4 p-2 w-full rounded-md ${activeTab === 'users' ? 'bg-indigo-900' : 'hover:bg-indigo-950'}`}
            >
              <Users className="mr-2" />
              Users
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center text-white mb-4 p-2 w-full rounded-md ${activeTab === 'reviews' ? 'bg-indigo-900' : 'hover:bg-indigo-950'}`}
            >
              <CheckSquare className="mr-2" />
              Review Approvals
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center text-white mb-4 p-2 w-full rounded-md ${activeTab === 'analytics' ? 'bg-indigo-900' : 'hover:bg-indigo-950'}`}
            >
              <BarChart2 className="mr-2" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center text-white mb-4 p-2 w-full rounded-md ${activeTab === 'settings' ? 'bg-indigo-900' : 'hover:bg-indigo-950'}`}
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
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'reviews' && 'Review Approvals'}
              {activeTab === 'analytics' && 'Analytics'}
              {activeTab === 'settings' && 'Settings'}
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {activeTab === 'users' && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReviews.map((review) => (
                    <tr key={review.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{review.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{review.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          review.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                          review.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {review.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-green-600 hover:text-green-900 mr-2">Approve</button>
                        <button className="text-red-600 hover:text-red-900 mr-2">Reject</button>
                        <button className="text-indigo-600 hover:text-indigo-900">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Analytics Dashboard</h3>
              <p className="text-gray-600 mb-4">Here you can add charts, graphs, and other analytical data visualizations.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Total Users</h4>
                  <p className="text-3xl font-bold">1,234</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Total Reviews</h4>
                  <p className="text-3xl font-bold">5,678</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Pending Reviews</h4>
                  <p className="text-3xl font-bold">42</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Average Rating</h4>
                  <p className="text-3xl font-bold">4.7</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Admin Settings</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name</label>
                  <input type="text" id="siteName" name="siteName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-4">
                  <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">Admin Email</label>
                  <input type="email" id="adminEmail" name="adminEmail" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-4">
                  <label htmlFor="maxReviewsPerUser" className="block text-sm font-medium text-gray-700">Max Reviews Per User</label>
                  <input type="number" id="maxReviewsPerUser" name="maxReviewsPerUser" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div className="mb-4">
                  <label htmlFor="autoApproveReviews" className="flex items-center">
                    <input type="checkbox" id="autoApproveReviews" name="autoApproveReviews" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    <span className="ml-2 text-sm text-gray-700">Auto-approve reviews</span>
                  </label>
                </div>
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Save Settings
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}