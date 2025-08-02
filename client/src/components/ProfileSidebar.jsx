// src/components/ProfileSidebar.jsx
import React, { useState } from "react";

const ProfileSidebar = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    dob: user.dob || "",
    company: user.company || "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col transition-transform duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Profile Settings</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-lg">✖</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
        {/* Profile Info */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email (read-only)</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-600"
            value={formData.email}
            readOnly
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded"
            value={formData.dob}
            onChange={(e) => handleChange("dob", e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Company</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
          />
        </div>

        {/* Security */}
        <div className="pt-4 border-t">
          <h3 className="text-sm font-semibold mb-2 text-gray-800">Security</h3>

          <div className="mb-3">
            <label className="block font-medium mb-1">New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between p-4 border-t">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-red-500 font-medium text-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
