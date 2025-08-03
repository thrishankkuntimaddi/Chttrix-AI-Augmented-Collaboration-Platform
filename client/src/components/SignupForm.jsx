import { useState } from 'react';

const SignupForm = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      alert("Signup successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Create your Chttrix Account</h2>
        <p className="mt-2 text-sm text-gray-600">Join our community of innovators.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required />
        <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Phone" required />
        <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" required />

        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
