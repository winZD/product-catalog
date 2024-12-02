import React, { FormEvent } from "react";

const Login = () => {
  const authenticate = async (
    username: string,
    password: string
  ): Promise<void> => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30, // optional, defaults to 60
        }),
        /*         credentials: "include", // Include cookies (e.g., accessToken) in the request
         */
      });

      const data = await response.json();

      if (data) {
        localStorage.setItem("at", data.accessToken);
        localStorage.setItem("rt", data.refreshToken);
      }

      console.log(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    authenticate(username, password);
  };
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-80">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email Address
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={"emilys"}
            placeholder="Enter your email"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={"emilyspass"}
            placeholder="Enter your password"
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="mr-2"
            />
            <label htmlFor="remember" className="text-gray-600">
              Remember me
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
