import React, { useState, useEffect } from "react";
import axios from "axios";

const PublicationTable = () => {
  const [publications, setPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    pdfUrl: "",
    year: "",
    type: "",
    doi: "",
    recommendedCitation: "",
  });

  // Fetch all publications
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.get("https://portfolio-backend-87lm.onrender.com/publications");
        setPublications(response.data);
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };

    fetchPublications();
  }, []);

  // Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle submission of updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://portfolio-backend-87lm.onrender.com/publications/${selectedPublication._id}`,
        formData
      );
      alert("Publication updated successfully!");
      setPublications(
        publications.map((pub) =>
          pub._id === selectedPublication._id ? response.data : pub
        )
      );
    } catch (error) {
      console.error("Error updating publication:", error);
      alert("Failed to update publication.");
    }
  };

  // Handle publication selection from the table
  const handleSelectPublication = (publication) => {
    setSelectedPublication(publication);
    setFormData({
      title: publication.title,
      abstract: publication.abstract,
      pdfUrl: publication.pdfUrl,
      year: publication.year,
      type: publication.type,
      doi: publication.doi,
      recommendedCitation: publication.recommendedCitation,
    });
  };

  // Handle publication deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this publication?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://portfolio-backend-87lm.onrender.com/publications/${id}`);
        setPublications(publications.filter((pub) => pub._id !== id));
        alert("Publication deleted successfully!");
      } catch (error) {
        console.error("Error deleting publication:", error);
        alert("Failed to delete publication.");
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Publications</h1>

      {/* Publications Table */}
      <table className="w-full table-auto border-collapse mb-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Type</th>
            {/* <th className="border px-4 py-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {publications.map((publication) => (
            <tr
              key={publication._id}
              onClick={() => handleSelectPublication(publication)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border px-4 py-2">{publication.title}</td>
              <td className="border px-4 py-2">{publication.year}</td>
              <td className="border px-4 py-2">{publication.type}</td>
              {/* <td className="border px-4 py-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the row click event
                    handleDelete(publication._id);
                  }}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for Editing Selected Publication */}
      {selectedPublication && (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md">
          <h1 className="text-2xl font-bold mb-6">Edit Publication</h1>
          <form onSubmit={handleSubmit}>
            {/* Form fields for Title, Abstract, PDF URL, Year, DOI, Recommended Citation */}
            {[{ name: "title", label: "Title" }, { name: "abstract", label: "Abstract" }, { name: "pdfUrl", label: "PDF URL" }, { name: "year", label: "Year" }, { name: "doi", label: "DOI" }, { name: "recommendedCitation", label: "Recommended Citation" }].map(({ name, label }) => (
              <div key={name} className="mb-4">
                <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
                  {label}
                </label>
                {name === "abstract" ? (
                  <textarea
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    rows="5"
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

            {/* Type Field */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Update Publication
            </button>
          </form>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
    </div>

  );
};

export default PublicationTable;
