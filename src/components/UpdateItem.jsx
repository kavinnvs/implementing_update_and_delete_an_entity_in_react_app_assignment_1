import { useState, useEffect } from "react";
import axios from "axios";

const UpdateItem = () => {
  const [item, setItem] = useState(null); // Stores existing item
  const [updatedItem, setUpdatedItem] = useState(""); // Stores updated value
  const [responseMessage, setResponseMessage] = useState(""); // Stores API response message

  const itemId = 1; // Change this dynamically based on your use case
  const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/${itemId}`;

  // Fetch Existing Item
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(API_URI);
        setItem(response.data);
        setUpdatedItem(response.data.name); // Assuming 'name' is being updated
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, []);

  // Handle Input Change
  const handleInputChange = (event) => {
    setUpdatedItem(event.target.value);
  };

  // Handle Form Submission (Update API Request)
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(API_URI, { name: updatedItem });
      setResponseMessage("Item updated successfully!");
      setItem(response.data); // Update UI with new data
    } catch (error) {
      setResponseMessage("Failed to update item.");
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Update Item</h2>

      {item ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Update Name:</span>
            <input
              type="text"
              value={updatedItem}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
            />
          </label>

          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Update
          </button>
        </form>
      ) : (
        <p>Loading item...</p>
      )}

      {responseMessage && <p className="mt-2 text-green-600">{responseMessage}</p>}
    </div>
  );
};

export default UpdateItem;
