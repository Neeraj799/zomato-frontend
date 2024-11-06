// DishesDetails.js
import React from "react";

const DishesDetails = ({ dish, onUpdate }) => {
  return (
    <tr>
      <td className="px-4 py-2">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-16 h-16 object-cover"
        />
      </td>
      <td className="px-4 py-2">{dish.title}</td>
      <td className="px-4 py-2">{dish.category?.name}</td>{" "}
      <td className="px-4 py-2">
        {dish.modifiers.length > 0
          ? dish.modifiers.map((modifier) => modifier.name).join(", ")
          : "No modifiers"}
      </td>
      <td className=" px-4 py-2">{dish.description}</td>
      <td className="border px-4 py-2">
        <button
          onClick={() => onUpdate(dish)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default DishesDetails;
