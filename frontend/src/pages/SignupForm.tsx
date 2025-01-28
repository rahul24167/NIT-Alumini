import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

const SignupForm: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  const token = urlParams.get("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    department: "",
    batch: "",
    enroll: "",
    phone: "",
    linkdn: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Image is required!");
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("course", formData.course);
    formDataToSend.append("department", formData.department);
    formDataToSend.append("batch", formData.batch);
    formDataToSend.append("enroll", formData.enroll);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("linkdn", formData.linkdn);
    formDataToSend.append("twitter", formData.twitter);
    formDataToSend.append("facebook", formData.facebook);
    formDataToSend.append("instagram", formData.instagram);
    formDataToSend.append("photo", image);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1?token=${token}&email=${email}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if(response.status === 200){
        alert("Profile completed successfully!");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error completing profile:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        {/* Course */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course
          </label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        {/* Batch */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Batch
          </label>
          <input
            type="text"
            name="batch"
            value={formData.batch}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        {/* Optional Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enrollment (Optional)
          </label>
          <input
            type="text"
            name="enroll"
            value={formData.enroll}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone (Optional)
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn (Optional)
          </label>
          <input
            type="url"
            name="linkdn"
            value={formData.linkdn}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Twitter (Optional)
          </label>
          <input
            type="url"
            name="twitter"
            value={formData.twitter}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Facebook (Optional)
          </label>
          <input
            type="url"
            name="facebook"
            value={formData.facebook}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Instagram (Optional)
          </label>
          <input
            type="url"
            name="instagram"
            value={formData.instagram}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
