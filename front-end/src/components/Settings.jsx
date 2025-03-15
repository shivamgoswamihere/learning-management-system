import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    address: { city: "", state: "", country: "", pincode: "" },
    profession: "",
    organization: { name: "", address: "" },
    socialLinks: { linkedIn: "", github: "", twitter: "" },
  });

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        phoneNumber: currentUser.phoneNumber || "",
        gender: currentUser.gender || "",
        dateOfBirth: currentUser.dateOfBirth ? currentUser.dateOfBirth.split("T")[0] : "",
        address: currentUser.address || { city: "", state: "", country: "", pincode: "" },
        profession: currentUser.profession || "",
        organization: currentUser.organization || { name: "", address: "" },
        socialLinks: currentUser.socialLinks || { linkedIn: "", github: "", twitter: "" },
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
    } else if (name.includes("socialLinks.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser({ id: currentUser._id, updates: formData })).unwrap();
      alert("Profile updated successfully!"); // Show success alert
      navigate("/profile"); // Redirect to profile page
    } catch (error) {
      alert("Failed to update profile!"); // Show error alert
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-5">Settings</h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-gray-500">Loading...</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Country</label>
          <input
            type="text"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {currentUser?.role === "trainer" && (
          <div>
            <label className="block text-sm font-medium">Professional Title</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        )}

        {currentUser?.role === "trainer" && (
          <div>
            <label className="block text-sm font-medium">Organization Name</label>
            <input
              type="text"
              name="organization.name"
              value={formData.organization.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium">LinkedIn</label>
          <input
            type="text"
            name="socialLinks.linkedIn"
            value={formData.socialLinks.linkedIn}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">GitHub</label>
          <input
            type="text"
            name="socialLinks.github"
            value={formData.socialLinks.github}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Twitter</label>
          <input
            type="text"
            name="socialLinks.twitter"
            value={formData.socialLinks.twitter}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Settings;
