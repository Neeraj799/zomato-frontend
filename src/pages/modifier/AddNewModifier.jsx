import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const AddNewModifier = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.string().required("Price is required"),
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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const { name, price } = formData;

      const form = new FormData();
      form.append("name", name);
      form.append("price", price);

      if (image) {
        form.append("image", image);
      }

      const response = await fetch(
        "http://localhost:4000/admin/modifiers/create",
        {
          method: "POST",
          body: form,
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);

        setFormData({
          name: "",
          price: "",
        });
        setImage(null);
      }
      navigate("/modifiers");
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.log("Error", error);
        alert("Failed to create modifier");
      }
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        Create New Modifier
      </h2>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Price
        </label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 transition"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && (
          <p className="text-red-500 text-xs mt-1">{errors.price}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Image
        </label>
        <input
          type="file"
          className="w-full p-2 border border-gray-300 rounded-md transition"
          id="image"
          name="image"
          onChange={handleImageChange}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Create Modifier
      </button>
    </form>
  );
};

export default AddNewModifier;
