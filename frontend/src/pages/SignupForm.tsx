import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

const SignupForm: React.FC = () => {
  const batchs = Array.from({ length: 2020 - 1960 + 1 }, (_, i) => 1960 + i);
  const departments = {
    1: {
      shortName: "CHEM",
      fullName: "Chemical Engineering",
    },
    2: {
      shortName: "CIVIL",
      fullName: "Civil Engineering",
    },
    3: {
      shortName: "CSE",
      fullName: "Computer Science Engineering",
    },
    4: {
      shortName: "EE",
      fullName: "Electrical Engineering",
    },
    5: {
      shortName: "ECE",
      fullName: "Electronics and Communication Engineering",
    },
    6: {
      shortName: "IT",
      fullName: "Information Technology",
    },
    7: {
      shortName: "MECH",
      fullName: "Mechanical Engineering",
    },
    8: {
      shortName: "MME",
      fullName: "Metallurgy & Materials Engineering",
    },
  };
  const courses = { 1: "B.Tech", 2: "M.Tech", 3: "Ph.D" };
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

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
        `${BACKEND_URL}/api/v1/user/auth/verify-email-and-complete-profile?token=${token}&email=${email}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.status === 200) {
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
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
        </div>
        <fieldset className="mb-4">
          <legend className="text-lg font-semibold mb-2">Select Batches</legend>
          <div className="flex flex-wrap gap-4">
            {batchs.map((batch) => (
              <div key={batch} className="flex items-center">
                <input
                  id={`batch-${batch}`}
                  type="radio"
                  name="batch"
                  value={batch.toString()}
                  checked={formData.batch === batch.toString()}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor={`batch-${batch}`}>{batch}</label>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Departments */}
        <fieldset className="mb-4">
          <legend className="text-lg font-semibold mb-2">
            Select Departments
          </legend>
          <div className="flex flex-wrap gap-4">
            {Object.entries(departments).map(
              ([id, { shortName, fullName }]) => (
                <div key={id} className="flex items-center">
                  <input
                    id={shortName}
                    type="radio"
                    name="department"
                    value={shortName}
                    checked={formData.department === shortName}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor={shortName}>{fullName}</label>
                </div>
              )
            )}
          </div>
        </fieldset>

        {/* Courses */}
        <fieldset className="mb-4">
          <legend className="text-lg font-semibold mb-2">Select Courses</legend>
          <div className="flex flex-wrap gap-4">
            {Object.entries(courses).map(([id, courseName]) => (
              <div key={id} className="flex items-center">
                <input
                  id={`course-${id}`}
                  type="radio"
                  name="course"
                  value={courseName}
                  checked={formData.course === courseName}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor={`course-${id}`}>{courseName}</label>
              </div>
            ))}
          </div>
        </fieldset>

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
