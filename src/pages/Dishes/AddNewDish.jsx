import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const AddNewDish = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [categories, setCategories] = useState([]);
  const [modifiers, setModifiers] = useState([]);

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:4000/admin/categories");
      const data = await response.json();

      if (response.ok) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchModifiers = async () => {
      const response = await fetch("http://localhost:4000/admin/modifiers");
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
    category: Yup.string().required("Category is required"),
    modifier: Yup.string().required("Modifier is required"),
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

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const handleModifierChange = (e) => {
    setFormData({
      ...formData,
      modifier: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const { title, description, price, category, modifier } = formData;
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("price", price);
      form.append("category", category);
      form.append("modifier", modifier);

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
          category: "",
          modifier: "",
        });
        setImage(null);
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
        alert("Failed to create Dish");
      }
    }
  };

  return (
    <form
      className="container p-4 bg-white shadow rounded"
      onSubmit={handleSubmit}
    >
      <h2>Create new dish</h2>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      {errors.title && (
        <p className="text-red-500 text-small mt-1">{errors.title}</p>
      )}

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

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          className="form-control"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      {errors.price && (
        <p className="text-red-500 text-small mt-1">{errors.price}</p>
      )}

      <div className="form-group">
        <label htmlFor="category">Select Category:</label>
        <select
          type="text"
          className="form-control"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleCategoryChange}
        >
          <option value=""> Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {errors.category && (
        <p className="text-red-500 text-small mt-1">{errors.category}</p>
      )}

      <div className="form-group">
        <label htmlFor="modifiers">Modifiers</label>
        <select
          type="text"
          className="form-control"
          id="modifier"
          name="modifier"
          value={formData.modifier}
          onChange={handleModifierChange}
        >
          <option value="">Select a modifier</option>

          {modifiers.map((modifier) => (
            <option key={modifier.id} value={modifier.id}>
              {modifier.name}
            </option>
          ))}
        </select>
      </div>
      {errors.modifier && (
        <p className="text-red-500 text-small mt-1">{errors.modifier}</p>
      )}

      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          className="form-control-file"
          id="image"
          name="image"
          onChange={handleImageChange}
        />
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Create dish
      </button>
    </form>
  );
};

export default AddNewDish;
