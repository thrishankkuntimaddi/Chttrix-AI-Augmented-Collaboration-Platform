import { useState } from 'react';

const LoginForm = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      alert("Login successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Welcome to Chttrix</h2>
        <p className="mt-2 text-sm text-gray-600">Sign in to start collaborating on your next big idea.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
