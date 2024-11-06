import React from "react";

const CategoryDetails = ({ category, onUpdate }) => {
  return (
    <tr>
      <td className="border px-4 py-2">
        <img
          src={category.image}
          alt={category.name}
          className="w-24 h-24 object-cover"
        />
      </td>
      <td className="border px-4 py-2">{category.name}</td>
      <td className="border px-4 py-2">{category.description}</td>
      <td className="border px-4 py-2">
        <button
          onClick={() => onUpdate(category)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default CategoryDetails;
