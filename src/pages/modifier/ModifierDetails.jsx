import React from "react";

const ModifierDetails = ({ modifier }) => {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Modifiers</h2>
          <h2>{modifier.name}</h2>
          <p>{modifier.price}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModifierDetails;
