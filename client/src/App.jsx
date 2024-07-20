import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPanel from './component/admin/AdminPanel';
import ReviewClub from './component/user/ReviewClub';
import LoginPage from './component/utils/Login';
import UserDashboard from './component/user/UserDashboard';
import CreateReviewForm from './component/user/CreateReviewForm';

function App() {

  const [reviews, setReviews] = useState([]);

  return (
    <>
      <Routes>
        <Route path="/" element={<ReviewClub />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<UserDashboard reviews={reviews} setReviews={setReviews} />} />
        <Route path="/create-review" element={<CreateReviewForm reviews={reviews} setReviews={setReviews} />} />

      </Routes>
    </>
  );
}

export default App;