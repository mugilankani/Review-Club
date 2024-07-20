// App.js
import { useEffect, useState, createContext, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./component/admin/AdminPanel";
import ReviewClub from "./component/user/ReviewClub";
import LoginPage from "./component/utils/Login";
import UserDashboard from "./component/user/UserDashboard";
import CreateReviewForm from "./component/user/CreateReviewForm";
import axios from "axios";
import Navbar from "./component/Navbar";

export const UserContext = createContext();

function App() {
	const [user, setUser] = useState(null); // Store user data
	const [isLoggedIn, setIsLoggedIn] = useState(false); // Store login status
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}/auth`, {
				withCredentials: true,
			})
			.then((res) => {
				const userData = res.data;
				console.log(userData);
				setUser(userData);
				setIsLoggedIn(true); // Assuming the API returns user data if logged in
			})
			.catch(() => {
				setIsLoggedIn(false); // If error occurs, assume user is not logged in
			});
	}, []);

	return (
		<UserContext.Provider
			value={{ user, isLoggedIn, setUser, setIsLoggedIn }}
		>
			<Navbar />
			<Routes>
				<Route path="/" element={<ReviewClub />} />
				<Route path="/admin" element={<AdminPanel />} />
				<Route path="/login" element={<LoginPage />} />
				<Route
					path="/dashboard"
					element={
						<UserDashboard
							reviews={reviews}
							setReviews={setReviews}
						/>
					}
				/>
				<Route
					path="/create-review"
					element={
						<CreateReviewForm
							reviews={reviews}
							setReviews={setReviews}
						/>
					}
				/>
				<Route
					path="/auth/success"
					element={<Link to="/">Go to home</Link>}
				/>
			</Routes>
		</UserContext.Provider>
	);
}

export default App;
