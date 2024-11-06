import React, { useEffect, useState } from "react";
import ModifierDetails from "./ModifierDetails";
import UpdateModifierModal from "./UpdateModal";

const Modifiers = () => {
  const [modifiers, setModifiers] = useState([]);
  const [selectedModifier, setSelectedModifier] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in to access this page.");
      window.location.href = "/login";
      return;
    }

    const fetchModifiers = async () => {
      try {
        const response = await fetch("http://localhost:4000/admin/modifiers", {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch modifiers");
        }

        const data = await response.json();
        setModifiers(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchModifiers();
  }, []);

  const handleUpdate = async (id, formData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("You need to log in to update a modifier.");
        return;
      }

      const response = await fetch(
        `http://localhost:4000/admin/modifiers/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: token,
          },
          body: formData,
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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:4000/admin/modifiers/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the category");
      }

      setModifiers((prevModifiers) =>
        prevModifiers.filter((modifier) => modifier._id !== id)
      );
      alert("Category deleted successfully!");
    } catch (error) {
      alert(`Error deleting category: ${error.message}`);
    }
  };

  const handleUpdateClick = (modifier) => {
    setSelectedModifier(modifier);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {errorMessage && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {errorMessage}
        </div>
      )}

      {!errorMessage && (
        <>
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
                    onDelete={handleDelete}
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
        </>
      )}
    </div>
  );
};

export default Modifiers;
