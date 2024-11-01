import React, { useEffect, useState } from "react";
import ModifierDetails from "./ModifierDetails";

const Modifiers = () => {
  const [modifiers, setModifiers] = useState([]);

  useEffect(() => {
    const fetchModifiers = async () => {
      const response = await fetch("http://localhost:4000/admin/modifiers");
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
          <div className="mt-2">
            {modifiers &&
              modifiers.map((modifier) => (
                <div className="mt-20">
                  <ModifierDetails key={modifier._id} modifier={modifier} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modifiers;
