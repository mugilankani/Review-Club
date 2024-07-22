import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, ThumbsUp, MessageSquare, Star } from 'lucide-react';

const PostModal = ({ postId, onClose, onApprove, onReject, onDelete }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/post/${postId}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{post.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-4">
            <img src={post.user.displayPicture} alt={post.user.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <p className="font-semibold">{post.user.name}</p>
              <p className="text-sm text-gray-500">{new Date(post.date).toLocaleString()}</p>
            </div>
          </div>
          <p className="mb-4">{post.content}</p>
          {post.images && post.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {post.images.slice(0, 4).map((image, index) => (
                <img key={index} src={image} alt={`Review image ${index + 1}`} className="w-full h-40 object-cover rounded" />
              ))}
            </div>
          )}
          
        </div>
        <div className="p-4 border-t flex justify-end space-x-2">
          {!post.approved && (
            <button onClick={() => onApprove(post.id)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Approve
            </button>
          )}
          {post.approved && (
            <button onClick={() => onReject(post.id)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Reject
            </button>
          )}
          <button onClick={() => onDelete(post.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;