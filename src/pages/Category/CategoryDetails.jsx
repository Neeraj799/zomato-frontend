import React from "react";

const CategoryDetails = ({ category }) => {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Category</h2>
          <h2>{category.name}</h2>
          <p>{category.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryDetails;
