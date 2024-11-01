import React from "react";

const DishesDetails = ({ dish }) => {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={dish.image} alt={dish.title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Dishes</h2>
          <p>Choose from our variety of products.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DishesDetails;
