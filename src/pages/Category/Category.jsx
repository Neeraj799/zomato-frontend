import React, { useEffect, useState } from "react";
import CategoryDetails from "./CategoryDetails";
import EditCategory from "./EditCategory";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch("http://localhost:4000/admin/categories");
      const data = await response.json();

      if (response.ok) {
        setCategory(data);
      }
    };
    fetchCategory();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/admin/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setCategory(category.filter((category) => category._id !== id));
        alert("Category deleted successfully");
      }
    } catch (error) {
      console.log("Error", error);
      alert("Failed to delete category");
    }
  };

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
  };

  const handleUpdate = (updatedCategory) => {
    setCategory((prevCategories) =>
      prevCategories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      )
    );
  };

  return (
    <>
      {selectedCategory && isModalOpen && (
        <EditCategory
          category={selectedCategory}
          onUpdate={handleUpdate}
          onClose={closeModal}
        />
      )}
      <div className="">
        <div className="flex justify-end items-end w-100 h-20  shadow-xl mt-4">
          <a href="/categories/addCategory">
            <button className="btn btn-primary mb-4 mr-10">Add Category</button>
          </a>
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-2">
            {category &&
              category.map((category) => (
                <div key={category._id} className="mt-20">
                  <CategoryDetails category={category} />
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="btn btn-danger mt-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openModal(category)}
                    className="btn btn-warning mt-2 ml-2"
                  >
                    Update
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
