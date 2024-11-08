import React, { useEffect, useState } from "react";

const UpdateCategoryModal = ({ isOpen, onClose, category, onUpdate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      if (category.image) {
        setImagePreview(category.image);
      }
    }
  }, [category]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description) {
      alert("Please fill in all fields correctly");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    await onUpdate(category._id, formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Update Modifier</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
              className="input input-primary w-full mb-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="price">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Category Description"
              className="input input-primary w-full mb-4"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="image">
              Category Image
            </label>
            {imagePreview && (
              <div className="mb-2">
                <img
                  src={imagePreview}
                  alt="Modifier Preview"
                  className="w-32 h-32 object-cover"
                />
              </div>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="input input-primary w-full mb-4"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
