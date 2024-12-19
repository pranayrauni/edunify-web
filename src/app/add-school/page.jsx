"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const AddSchoolPage = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email_id: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [contactError, setContactError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'contact') {
      // Only allow numeric input
      const numericValue = value.replace(/[^0-9]/g, '');
      
      // Validate contact number length
      if (numericValue.length > 10) {
        setContactError("Contact number should not exceed 10 digits");
      } else if (numericValue.length < 10 && numericValue.length > 0) {
        setContactError("Contact number should be 10 digits");
      } else if (numericValue.length === 10) {
        setContactError("");
      }
      
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Cleanup function to revoke object URL when component unmounts or new image is selected
  const cleanupImagePreview = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate contact number before submission
    if (formData.contact.length !== 10) {
      setContactError("Contact number must be exactly 10 digits");
      return;
    }

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
      // Reset form data
      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        contact: "",
        email_id: "",
      });
      setContactError("");
      // Reset image file state and preview
      setImageFile(null);
      cleanupImagePreview();
      setImagePreview(null);
      // Reset the file input element
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      alert("Error adding school: " + result.error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-4/5 rounded bg-white p-6 shadow-md md:w-3/5 lg:w-2/5"
      >
        <h1 className="mb-4 text-center text-2xl font-bold text-black">
          Add School
        </h1>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block font-medium text-black">
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
              className="w-full rounded border border-gray-300 bg-white p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="mb-1 block font-medium text-black">
              Address:
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full rounded border border-gray-300 bg-white p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="city" className="mb-1 block font-medium text-black">
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
              className="w-full rounded border border-gray-300 bg-white p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="state" className="mb-1 block font-medium text-black">
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
              className="w-full rounded border border-gray-300 bg-white p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="contact" className="mb-1 block font-medium text-black">
              Contact:
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              placeholder="Enter 10-digit contact number"
              value={formData.contact}
              onChange={handleInputChange}
              required
              maxLength="10"
              className={`w-full rounded border ${
                contactError ? 'border-red-500' : 'border-gray-300'
              } bg-white p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {contactError && (
              <p className="mt-1 text-sm text-red-500">{contactError}</p>
            )}
          </div>
          <div>
            <label htmlFor="email_id" className="mb-1 block font-medium text-black">
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
              className="w-full rounded border border-gray-300 bg-white p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="mb-1 block font-medium text-black">
              Upload image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
              ref={fileInputRef}
              className="my-2 w-full rounded border border-gray-300 bg-white p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 rounded-lg object-contain"
                />
              </div>
            )}
          </div>
          <div className="flex w-full items-center justify-between">
            <Link
              href="/show-school"
              className="my-2 rounded bg-blue-500 p-2 text-white"
            >
              View Schools
            </Link>
            <button
              type="submit"
              className="my-2 rounded bg-blue-500 p-2 text-white"
            >
              Add School
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSchoolPage;