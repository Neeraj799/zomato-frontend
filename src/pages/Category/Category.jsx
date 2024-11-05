import React, { useEffect, useState } from "react";
import CategoryDetails from "./CategoryDetails";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchCategory = async () => {
      const response = await fetch("http://localhost:4000/admin/categories", {
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
        setCategory(data);
      }
    };
    fetchCategory();
  }, []);

  return (
    <>
      <div className="">
        <div className="flex justify-end items-end w-100 h-20  shadow-xl mt-4">
          <a href="/categories/addCategory">
            <button className="btn btn-primary mb-4 mr-10">Add Category</button>
          </a>
        </div>
        <div className="flex items-center justify-center">
          {/* <div className="mt-2">
            {category &&
              category.map((category) => (
                <div key={category._id} className="mt-20">
                  <CategoryDetails category={category} />
                  
                </div>
              ))}
          </div> */}
          <table className="table-auto w-full mt-4 border border-gray-200 shadow-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {category &&
                category.map((category) => (
                  <CategoryDetails category={category} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Category;
