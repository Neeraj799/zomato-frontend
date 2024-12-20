import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const AddNewDish = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    actualPrice: "",
    categories: [], // Changed from single category to array
    modifiers: [],
  });

  const [categories, setCategories] = useState([]);
  const [modifiers, setModifiers] = useState([]);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
        setCategories(data);
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
        setModifiers(data);
      }
    };
    fetchModifiers();
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.string().required("Price is required"),
    categories: Yup.array().min(1, "At least one category is required"), // Updated validation
    modifiers: Yup.array().min(1, "At least one modifier is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Updated to handle multiple category selection
  const handleCategoryChange = (categoryId) => {
    setFormData((prevData) => {
      const updatedCategories = prevData.categories.includes(categoryId)
        ? prevData.categories.filter((id) => id !== categoryId)
        : [...prevData.categories, categoryId];

      return {
        ...prevData,
        categories: updatedCategories,
      };
    });

    setErrors((prev) => ({
      ...prev,
      categories: "",
    }));
  };

  const handleModifierChange = (modifierId) => {
    setFormData((prevData) => {
      const updatedModifiers = prevData.modifiers.includes(modifierId)
        ? prevData.modifiers.filter((id) => id !== modifierId)
        : [...prevData.modifiers, modifierId];

      return {
        ...prevData,
        modifiers: updatedModifiers,
      };
    });

    setErrors((prev) => ({
      ...prev,
      modifiers: "",
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const { title, description, price, actualPrice, categories, modifiers } =
        formData;
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("price", price);
      form.append("actualPrice", actualPrice);

      // Updated to handle multiple categories
      categories.forEach((category) => {
        form.append("categories", category);
      });

      modifiers.forEach((modifier) => {
        form.append("modifiers", modifier);
      });

      if (image) {
        form.append("image", image);
      }

      const response = await fetch(
        "http://localhost:4000/admin/dishes/create",
        {
          method: "POST",
          body: form,
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        setFormData({
          title: "",
          description: "",
          price: "",
          actualPrice: "",
          categories: [],
          modifiers: [],
        });
        setImage(null);
      }
      navigate("/dishes");
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.log("Error", error);
        alert("Failed to create Dish");
      }
    }
  };

  return (
    <form
      className="container mx-auto p-6 bg-white shadow-lg rounded-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Dish</h2>

      <div className="form-group mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      <div className="form-group mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      <div className="form-group mb-4">
        <label
          htmlFor="actualPrice"
          className="block text-sm font-medium text-gray-700"
        >
          Actual price
        </label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500"
          id="actualPrice"
          name="actualPrice"
          value={formData.actualPrice}
          onChange={handleChange}
        />
        {errors.actualPrice && (
          <p className="text-red-500 text-xs mt-1">{errors.actualPrice}</p>
        )}
      </div>

      <div className="form-group mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && (
          <p className="text-red-500 text-xs mt-1">{errors.price}</p>
        )}
      </div>

      {/* Updated Categories section to use checkboxes */}
      <div className="form-group mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categories
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded p-3">
          {categories.map((category) => (
            <div key={category._id} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category._id}`}
                checked={formData.categories.includes(category._id)}
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
        {errors.categories && (
          <p className="text-red-500 text-xs mt-1">{errors.categories}</p>
        )}
      </div>

      <div className="form-group mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Modifiers
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded p-3">
          {modifiers.map((modifier) => (
            <div key={modifier._id} className="flex items-center">
              <input
                type="checkbox"
                id={`modifier-${modifier._id}`}
                checked={formData.modifiers.includes(modifier._id)}
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
        {errors.modifiers && (
          <p className="text-red-500 text-xs mt-1">{errors.modifiers}</p>
        )}
      </div>

      <div className="form-group mb-4">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image
        </label>
        <input
          type="file"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          id="image"
          name="image"
          onChange={handleImageChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 mt-4"
      >
        Create Dish
      </button>
    </form>
  );
};

export default AddNewDish;
