import React, { useEffect, useState } from "react";
import DishesDetails from "./DishesDetails";

const Dishes = () => {
  const [dishes, setdishes] = useState([]);

  useEffect(() => {
    const fetchdishes = async () => {
      const response = await fetch("http://localhost:4000/admin/dishes");
      const data = await response.json();

      if (response.ok) {
        setdishes(data);
      }
    };
    fetchdishes();
  }, []);

  return (
    <>
      <div className="">
        <div className="flex justify-end items-end w-100 h-20  shadow-xl mt-4">
          <a href="/dishes/addDish">
            <button className="btn btn-primary mb-4 mr-10">Add Dish</button>
          </a>
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-2">
            {dishes &&
              dishes.map((dish) => (
                <div className="mt-20">
                  <DishesDetails key={dish._id} dish={dish} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dishes;
