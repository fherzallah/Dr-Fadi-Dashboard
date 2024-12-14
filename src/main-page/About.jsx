import React, { useState } from "react";
import axios from "axios";

const AddPublication = () => {
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    pdfUrl: "",
    year: "",
    type: "",
    doi: "",
    recommendedCitation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/publications", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Publication added successfully!");
      setFormData({
        title: "",
        abstract: "",
        pdfUrl: "",
        year: "",
        type: "",
        doi: "",
        recommendedCitation: "",
      });
    } catch (error) {
      console.error("Error adding publication:", error);
      alert("Failed to add publication.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Add New Publication</h1>
      <form onSubmit={handleSubmit}>
        {[{ name: "title", label: "Title" },
          { name: "abstract", label: "Abstract", isTextArea: true },
          { name: "pdfUrl", label: "PDF URL" },
          { name: "year", label: "Year" },
          { name: "doi", label: "DOI" },
          { name: "recommendedCitation", label: "Recommended Citation" }
        ].map(({ name, label, isTextArea }) => (
          <div key={name} className="mb-4">
            <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
              {label}
            </label>
            {isTextArea ? (
              <textarea
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            ) : (
              <input
                type="text"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            )}
          </div>
        ))}

        {/* Type field */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-medium mb-2">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select type</option>
            <option value="Published Articles">Published Articles</option>
            <option value="Accepted Articles">Accepted Articles</option>
            <option value="Under Review">Under Review</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPublication;
