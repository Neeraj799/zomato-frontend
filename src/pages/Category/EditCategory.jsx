import React, { useState } from "react";

const EditCategory = ({ category, onUpdate, onClose }) => {
  const [updatedCategory, setUpdatedCategory] = useState({
    name: category.name,
    description: category.description,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/admin/categories/${category._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCategory),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        onUpdate(updatedData.category);
        alert("Category updated successfully");
        onClose();
      }
    } catch (error) {
      console.log("Error updating category:", error);
      alert("Failed to update category");
    }
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-content bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Category</h2>
        <input
          type="text"
          name="name"
          value={updatedCategory.name}
          onChange={handleChange}
          placeholder="Category Name"
          className="input input-primary w-full mb-2"
        />
        <textarea
          name="description"
          value={updatedCategory.description}
          onChange={handleChange}
          placeholder="Category Description"
          className="input input-primary w-full mb-4"
        />
        <div className="flex justify-end">
          <button onClick={handleUpdate} className="btn btn-success mr-2">
            Submit
          </button>
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
