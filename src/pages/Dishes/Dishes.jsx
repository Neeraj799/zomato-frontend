import React, { useEffect, useState } from "react";
import DishesDetails from "./DishesDetails";

const Dishes = () => {
  const [dishes, setdishes] = useState([]);

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
      setdishes(data);
    };
    fetchdishes();
  }, []);
  console.log(dishes);
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
              <DishesDetails key={dish._id} dish={dish} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dishes;
