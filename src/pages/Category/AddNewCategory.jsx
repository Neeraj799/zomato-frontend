import React, { useState } from "react";
import * as Yup from "yup";

const AddNewCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
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
      const { name, description } = formData;

      const form = new FormData();
      form.append("name", name);
      form.append("description", description);

      const response = await fetch(
        "http://localhost:4000/admin/categories/createCategory",
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
          description: "",
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
        alert("Failed to create Category");
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
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      {errors.description && (
        <p className="text-red-500 text-small mt-1">{errors.description}</p>
      )}
      <button type="submit" className="btn btn-primary mt-3">
        Create Category
      </button>
    </form>
  );
};

export default AddNewCategory;
