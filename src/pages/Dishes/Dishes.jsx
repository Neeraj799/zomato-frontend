import React, { useEffect, useState } from "react";
import DishesDetails from "./DishesDetails";
import UpdateDishModal from "./UpdateDishModal";

const Dishes = () => {
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in to access this page.");
      window.location.href = "/login";
      return;
    }

    const fetchDishes = async () => {
      try {
        const response = await fetch("http://localhost:4000/admin/dishes", {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dishes");
        }

        const data = await response.json();
        setDishes(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchDishes();
  }, []);

  const handleUpdate = async (id, formData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:4000/admin/dishes/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setDishes((prevDishes) =>
          prevDishes.map((dish) => (dish._id === id ? data.submission : dish))
        );
        setModalOpen(false);
        alert("Dish updated successfully!");
        window.location.reload();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert(`Error updating Dish: ${error.message}`);
    }
  };

  const handleUpdateClick = (dish) => {
    setSelectedDish(dish);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:4000/admin/dishes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the dish");
      }

      setDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== id));
      alert("Dish deleted successfully!");
    } catch (error) {
      alert(`Error deleting dish: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <>
        <div className="flex justify-end items-end w-full h-20 shadow-xl mt-4">
          <a href="/dishes/addDish">
            <button className="btn btn-primary mb-4 mr-10">Add Dish</button>
          </a>
        </div>

        <div className="flex items-center justify-center">
          <table className="table-auto w-full mt-4 border border-gray-200 shadow-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Dish Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Modifier</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map((dish) => (
                <DishesDetails
                  key={dish._id}
                  dish={dish}
                  onUpdate={handleUpdateClick}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>

        {selectedDish && (
          <UpdateDishModal
            isOpen={isModalOpen}
            onClose={() => {
              setModalOpen(false);
              setSelectedDish(null);
            }}
            dish={selectedDish}
            onUpdate={handleUpdate}
          />
        )}
      </>
    </div>
  );
};

export default Dishes;
