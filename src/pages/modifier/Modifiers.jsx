import React, { useEffect, useState } from "react";
import ModifierDetails from "./ModifierDetails";

const Modifiers = () => {
  const [modifiers, setModifiers] = useState([]);

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

  return (
    <>
      <div className="">
        <div className="flex justify-end items-end w-100 h-20  shadow-xl mt-4">
          <a href="/modifiers/addModifier">
            <button className="btn btn-primary mb-4 mr-10">Add Modifier</button>
          </a>
        </div>
        <div className="flex items-center justify-center">
          <table className="table-auto w-full mt-4 border border-gray-200 shadow-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {modifiers &&
                modifiers.map((modifier) => (
                  <ModifierDetails key={modifier._id} modifier={modifier} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Modifiers;
