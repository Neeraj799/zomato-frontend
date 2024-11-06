import React, { useEffect, useState } from "react";

const UpdateDishModal = ({ isOpen, onClose, dish, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allModifiers, setAllModifiers] = useState([]);
  const [selectedModifiers, setSelectedModifiers] = useState([]);

  useEffect(() => {
    if (dish) {
      setTitle(dish.title);
      setPrice(dish.price);
      setDescription(dish.description);
      setCategory(dish.category._id);
      setSelectedModifiers(dish.modifiers.map((mod) => mod._id));
    }
  }, [dish]);

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

  const handleModifierChange = (modifierId) => {
    setSelectedModifiers((prevModifiers) =>
      prevModifiers.includes(modifierId)
        ? prevModifiers.filter((id) => id !== modifierId)
        : [...prevModifiers, modifierId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !category || !description) {
      alert("Please fill in all fields correctly");
      return;
    }
    await onUpdate(dish._id, {
      title,
      price,
      category,
      modifiers: selectedModifiers,
      description,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Update Dishes</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dish Name"
              className="input input-primary w-full mb-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Dish Description"
              className="input input-primary w-full mb-4"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="input input-primary w-full mb-2"
            />
          </div>

          <div className="form-group mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Select Category
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {allCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modifiers
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded p-3">
              {allModifiers.map((modifier) => (
                <div key={modifier._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`modifier-${modifier._id}`}
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

export default UpdateDishModal;
