"use client";

import { useDispatch } from "react-redux";
import { signIn } from "../../store/slices/authSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";

const mockCredentials = [
	{ username: "user1", password: "password1" },
	{ username: "user2", password: "password2" },
	{ username: "user3", password: "password3" },
	{ username: "user4", password: "password4" },
];

export default function SignInPage() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSignIn = () => {
		const user = mockCredentials.find(
			(cred) => cred.username === username && cred.password === password
		);

		if (user) {
			const token = `secret-tokabc123`;  
			dispatch(signIn(token));
			setError("");
			router.push("/"); 
		} else {
			setError("Invalid username or password");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-950/95 p-5">
			<div className="max-w-lg w-full bg-white dark:bg-gray-900 rounded-2xl shadow-md p-10 text-center">
				<h1 className="text-4xl font-bold mb-5 text-gray-800 dark:text-white">
					Welcome to InsightsMesh
				</h1>
				<p className="text-lg mb-7 text-gray-600 dark:text-gray-400">
					Sign in to access your personalized insights
				</p>
				<p className="text-sm mb-4 text-gray-500 dark:text-gray-300 bg-gray-200 dark:bg-gray-900 p-3 rounded-2xl border border-gray-300 dark:border-gray-800 shadow-md flex flex-row items-center justify-between space-x-4">
					<span className="font-medium text-gray-800 dark:text-white bg-gray-300 dark:bg-gray-800 p-2 rounded-2xl">Username: <span className="text-blue-600 dark:text-blue-500">user1</span></span>
					<span className="font-medium text-gray-800 dark:text-white bg-gray-300 dark:bg-gray-800 p-2 rounded-2xl">Password: <span className="text-blue-600 dark:text-blue-500">password1</span></span>
				</p>
				<input
					type="text"
					placeholder="Enter your username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="w-full p-4 mb-4 border border-gray-300 dark:border-gray-800 rounded-2xl text-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
				/>
				<input
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full p-4 mb-4 border border-gray-300 dark:border-gray-800 rounded-2xl text-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
				/>
				<button
					onClick={handleSignIn}
					className="w-full p-4 bg-blue-500 dark:bg-blue-700 text-white rounded-2xl text-lg hover:bg-blue-600 dark:hover:bg-blue-800"
				>
					Sign In
				</button>
				{error && (
					<p className="text-red-500 dark:text-red-400 mt-4 text-lg">{error}</p>
				)}
			</div>
		</div>
	);
}
