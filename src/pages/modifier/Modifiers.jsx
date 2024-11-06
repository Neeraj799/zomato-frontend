import React, { useEffect, useState } from "react";
import ModifierDetails from "./ModifierDetails";
import UpdateModifierModal from "./UpdateModal";

const Modifiers = () => {
  const [modifiers, setModifiers] = useState([]);
  const [selectedModifier, setSelectedModifier] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchModifiers = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/admin/modifiers", {
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
      if (response.ok) {
        setModifiers(data);
      }
    };
    fetchModifiers();
  }, []);

  const handleUpdate = async (id, name, price) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/admin/modifiers/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, price }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setModifiers((prevModifiers) =>
          prevModifiers.map((modifier) =>
            modifier._id === id ? data.submission : modifier
          )
        );
        setModalOpen(false);
        alert("Modifier updated successfully!");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert(`Error updating modifier: ${error.message}`);
    }
  };

  const handleUpdateClick = (modifier) => {
    setSelectedModifier(modifier);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-6">
        <a href="/modifiers/addModifier">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Add Modifier
          </button>
        </a>
      </div>

      <div className="bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-gray-500">Image</th>
              <th className="px-6 py-3 text-left text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-gray-500">Price</th>
              <th className="px-6 py-3 text-left text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {modifiers.map((modifier) => (
              <ModifierDetails
                key={modifier._id}
                modifier={modifier}
                onUpdate={handleUpdateClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      {selectedModifier && (
        <UpdateModifierModal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedModifier(null);
          }}
          modifier={selectedModifier}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Modifiers;
