import React from "react";

const CategoryDetails = ({ category }) => {
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
    </tr>
  );
};

export default CategoryDetails;
