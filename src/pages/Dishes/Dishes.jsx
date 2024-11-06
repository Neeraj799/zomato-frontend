import React, { useEffect, useState } from "react";
import DishesDetails from "./DishesDetails";
import UpdateDishModal from "./UpdateDishModal";

const Dishes = () => {
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchdishes = async () => {
      const token = localStorage.getItem("token");

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
    };
    fetchdishes();
  }, []);

  const handleUpdate = async (id, title, category, modifiers, description) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/admin/dishes/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(title, category, modifiers, description),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the dishes array instead of selectedDish
        setDishes((prevDishes) =>
          prevDishes.map((dish) => (dish._id === id ? data.submission : dish))
        );
        setModalOpen(false);
        alert("Dish updated successfully!");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert(`Error updating Dish: ${error.message}`);
    }
  };

  const handleUpdateClick = (modifier) => {
    setSelectedDish(modifier);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto">
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
    </div>
  );
};

export default Dishes;
