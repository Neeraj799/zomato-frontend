import React from "react";

const ModifierDetails = ({ modifier }) => {
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
    </tr>
  );
};

export default ModifierDetails;
