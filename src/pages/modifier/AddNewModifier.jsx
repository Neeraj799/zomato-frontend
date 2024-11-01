import React, { useState } from "react";
import * as Yup from "yup";

const AddNewModifier = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const { name, price } = formData;

      const form = new FormData();
      form.append("name", name);
      form.append("price", price);

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
      }
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
      className="container p-4 bg-white shadow rounded"
      onSubmit={handleSubmit}
    >
      <h2>Create new Category</h2>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-red-500 text-small mt-1">{errors.name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <textarea
          className="form-control"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        ></textarea>
        {errors.price && (
          <p className="text-rose-500 text-small mt-1">{errors.price}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Create Modifier
      </button>
    </form>
  );
};

export default AddNewModifier;
