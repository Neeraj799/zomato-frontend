// DishesDetails.js
import React from "react";

const DishesDetails = ({ dish, onUpdate, onDelete }) => {
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
      <td className="px-4 py-2">
        {dish.categories.length > 0
          ? dish.categories.map((category) => category.name).join(", ")
          : "No categories"}
      </td>
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
      <td className="border px-4 py-2">
        <button
          onClick={() => onDelete(dish._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default DishesDetails;
