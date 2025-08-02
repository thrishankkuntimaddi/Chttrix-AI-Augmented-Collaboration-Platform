const LoginForm = ({ onSwitch }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Welcome to Chttrix</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to start collaborating on your next big idea.
        </p>
      </div>

      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            required
            placeholder="Enter your email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            required
            placeholder="Enter your password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
        >
          Login
        </button>

        <button className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
          <span>🔵</span> Login with Google
        </button>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{' '}
          <button type="button" onClick={onSwitch} className="text-blue-600 hover:underline">
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;