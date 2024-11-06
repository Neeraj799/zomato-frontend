import React, { useEffect, useState } from "react";
import CategoryDetails from "./CategoryDetails";
import UpdateCategoryModal from "./UpdateCategoryModal";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in to access this page.");
      window.location.href = "/login";
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/admin/categories", {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        alert(error.message);
        window.location.href = "/login";
      }
    };

    fetchCategories();
  }, []);

  const handleUpdate = async (id, formdata) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in to update a category.");
        window.location.href = "/login";
        return;
      }

      const response = await fetch(
        `http://localhost:4000/admin/categories/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
          },
          body: formdata,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === id ? data.submission : category
          )
        );
        setModalOpen(false);
        alert("Category updated successfully!");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert(`Error updating Category: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:4000/admin/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the category");
      }

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
      alert("Category deleted successfully!");
    } catch (error) {
      alert(`Error deleting category: ${error.message}`);
    }
  };

  const handleUpdateClick = (category) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end items-end w-100 h-20 shadow-xl mt-4">
        <a href="/categories/addCategory">
          <button className="btn btn-primary mb-4 mr-10">Add Category</button>
        </a>
      </div>

      <div className="flex items-center justify-center">
        <table className="table-auto w-full mt-4 border border-gray-200 shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <CategoryDetails
                key={category._id}
                category={category}
                onUpdate={handleUpdateClick}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      {selectedCategory && (
        <UpdateCategoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedCategory(null);
          }}
          category={selectedCategory}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Category;
