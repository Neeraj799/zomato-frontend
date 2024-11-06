import React from "react";

const ModifierDetails = ({ modifier, onUpdate, onDelete }) => {
  return (
    <tr>
      <td className="border px-4 py-2">
        <img
          src={modifier.image}
          alt={modifier.name}
          className="w-24 h-24 object-cover"
        />
      </td>
      <td className="border px-4 py-2">{modifier.name}</td>
      <td className="border px-4 py-2">{modifier.price}</td>
      <td className="border px-4 py-2">
        <button
          onClick={() => onUpdate(modifier)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          onClick={() => onDelete(modifier._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ModifierDetails;
