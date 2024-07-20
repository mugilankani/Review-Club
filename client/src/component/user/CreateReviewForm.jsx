import React, { useState } from 'react';

function CreateReviewForm({ reviews, setReviews }) {
  const [newReview, setNewReview] = useState({
    name: '',
    content: '',
    rating: 0,
    date: new Date().toISOString().split('T')[0],
    edited: false,
    likes: 0,
    comments: 0,
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setNewReview({ ...newReview, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new review with an id
    const reviewWithId = { ...newReview, id: reviews.length + 1 };

    // Save the review
    setReviews([...reviews, reviewWithId]);

    // Clear the form
    setNewReview({
      name: '',
      content: '',
      rating: 0,
      date: new Date().toISOString().split('T')[0],
      edited: false,
      likes: 0,
      comments: 0,
      images: [],
    });
    setImagePreviews([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r  flex items-center justify-center p-6">
      <div className="max-w-md w-full border-2  bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="App or comnpany name" className="block text-sm font-medium text-gray-700">
            Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newReview.name}
              onChange={handleInputChange}
              className="mt-1 block border border-black w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Review
            </label>
            <textarea
              id="content"
              name="content"
              rows="4"
              value={newReview.content}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md  shadow-sm focus:border-indigo-300 border border-black focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="0"
              max="5"
              value={newReview.rating}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-black rounded-md  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              Upload Images (up to 4)
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              {imagePreviews.map((preview, index) => (
                <img key={index} src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateReviewForm;
