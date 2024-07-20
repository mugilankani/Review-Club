import React, { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

function Navbar() {
	const { user, isLoggedIn } = useContext(UserContext);

	return (
		<nav className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex-shrink-0 flex items-center">
						<Link
							to="/"
							className="text-2xl font-bold text-indigo-600 cursor-pointer"
						>
							Review Club
						</Link>
					</div>
					{isLoggedIn ? (
						<div className="flex items-center">
							<Link
								to="/dashboard"
								className="hidden lg:ml-6 lg:flex lg:items-center"
							>
								<div className="flex-shrink-0 border rounded-full p-1 pr-4 flex items-center justify-center">
									<img
										className="h-8 w-8 rounded-full"
										src={user.displayPicture}
										alt="User avatar"
									/>
									<span className="ml-2 font-medium text-gray-700">
										{user.name}
									</span>
								</div>
							</Link>
						</div>
					) : (
						<Link
							to="/login"
							className="bg-indigo-600 p-2 my-auto text-white rounded-lg hover:bg-indigo-700 focus:outline-none h-fit focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Login
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
