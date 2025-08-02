const SignupForm = ({ onSwitch }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Create your Chttrix Account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Join our community of innovators.
        </p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            required
            placeholder="Choose a username"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            required
            placeholder="Enter your phone number"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            placeholder="Create a password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
        >
          Sign Up
        </button>

        <button className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
          <span>🔵</span> Sign up with Google
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <button type="button" onClick={onSwitch} className="text-blue-600 hover:underline">
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
