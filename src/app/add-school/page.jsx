"use client";

import { useState } from "react";

const AddSchoolPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email_id: "",
    // image: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files?.[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
    if (imageFile) {
      formDataObj.append("image", imageFile);
    }

    const response = await fetch("/api/schools", {
      method: "POST",
      body: formDataObj,
    });

    const result = await response.json();
    if (result.success) {
      alert("School added successfully!");
      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        contact: "",
        email_id: "",
      });
      setImageFile(null);
    } else {
      alert("Error adding school: " + result.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="w-4/5 md:w-3/5 lg:w-2/5 bg-white p-6 rounded shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-black">
          Add School
        </h1>

        <div className="my-2">
          <label htmlFor="name" className="block mb-1 font-medium text-black">
            School Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter school name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="my-2">
          <label
            htmlFor="address"
            className="block mb-1 font-medium text-black"
          >
            Address:
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="my-2">
          <label htmlFor="city" className="block mb-1 font-medium text-black">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="my-2">
          <label htmlFor="state" className="block mb-1 font-medium text-black">
            State:
          </label>
          <input
            type="text"
            id="state"
            name="state"
            placeholder="Enter state"
            value={formData.state}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="my-2">
          <label
            htmlFor="contact"
            className="block mb-1 font-medium text-black"
          >
            Contact:
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            placeholder="Enter contact number"
            value={formData.contact}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="my-2">
          <label
            htmlFor="email_id"
            className="block mb-1 font-medium text-black"
          >
            Email:
          </label>
          <input
            type="email"
            id="email_id"
            name="email_id"
            placeholder="Enter email"
            value={formData.email_id}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="my-2">
          <label htmlFor="image" className="block mb-1 font-medium text-black">
            Upload image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            required
            className="w-full p-2 border border-gray-300 rounded text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded my-2">
          Add School
        </button>
      </form>
    </div>
  );
};

export default AddSchoolPage;
