import React, { useEffect, useState } from "react";

const UpdateDishModal = ({ isOpen, onClose, dish, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allModifiers, setAllModifiers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedModifiers, setSelectedModifiers] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (dish) {
      setTitle(dish.title || "");
      setPrice(dish.price || "");
      setDescription(dish.description || "");
      // Add null checks for categories and modifiers
      setSelectedCategories(
        dish.categories ? dish.categories.map((cat) => cat._id) : []
      );
      setSelectedModifiers(
        dish.modifiers ? dish.modifiers.map((mod) => mod._id) : []
      );
      if (dish.image) {
        setImagePreview(dish.image);
      }
    }
  }, [dish]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/admin/categories", {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setAllCategories(data);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchModifiers = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/admin/modifiers", {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setAllModifiers(data);
      }
    };
    fetchModifiers();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId]
    );
  };

  const handleModifierChange = (modifierId) => {
    setSelectedModifiers((prevModifiers) =>
      prevModifiers.includes(modifierId)
        ? prevModifiers.filter((id) => id !== modifierId)
        : [...prevModifiers, modifierId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || selectedCategories.length === 0 || !description) {
      alert("Please fill in all fields correctly");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    selectedCategories.forEach((categoryId) =>
      formData.append("categories[]", categoryId)
    );

    selectedModifiers.forEach((modifierId) =>
      formData.append("modifiers[]", modifierId)
    );

    await onUpdate(dish._id, formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Update Dishes</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block mb-1 text-sm" htmlFor="name">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dish Name"
              className="input input-primary w-full mb-2 text-sm py-1 px-2 h-8"
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1 text-sm" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Dish Description"
              className="input input-primary w-full mb-4 text-sm py-1 px-2 h-8"
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1 text-sm" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="input input-primary w-full mb-2 text-sm py-1 px-2 h-8"
            />
          </div>

          <div className="form-group mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded p-3">
              {allCategories?.map((category) => (
                <div key={category._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category._id}`}
                    name="categories"
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`category-${category._id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modifiers
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded p-3">
              {allModifiers.map((modifier) => (
                <div key={modifier._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`modifier-${modifier._id}`}
                    name="modifiers"
                    checked={selectedModifiers.includes(modifier._id)}
                    onChange={() => handleModifierChange(modifier._id)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`modifier-${modifier._id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {modifier.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <label className="block mb-2 text-sm" htmlFor="image">
              Dish Image
            </label>
            {imagePreview && (
              <div className="mb-2">
                <img
                  src={imagePreview}
                  alt="Dish Preview"
                  className="w-32 h-32 object-cover"
                />
              </div>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="input input-primary w-full mb-4 text-sm py-1 px-2 h-8"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDishModal;
