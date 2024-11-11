import React, { useEffect, useState } from "react";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("http://localhost:4000/admin/orders");

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Error fetching orders");
        }

        // Parse the response JSON
        const data = await response.json();
        setOrders(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Orders List</h1>
      {orders.length === 0 ? (
        <p className="text-center text-xl text-gray-600">No orders available</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Order ID: {order._id}
            </h2>
            <p className="text-lg text-gray-600">
              Total Amount:{" "}
              <span className="font-bold text-green-600">
                ${order.totalAmount}
              </span>
            </p>
            <p className="text-lg text-gray-600">Address: {order.address}</p>
            <p className="text-lg text-gray-600">
              Order Date:{" "}
              <span className="font-bold">
                {new Date(order.created_at).toLocaleString()}
              </span>
            </p>

            {/* Displaying User Information */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-700">
                User Information
              </h3>
              {order.user ? (
                <div className="text-gray-600">
                  <p>
                    Username:{" "}
                    <span className="font-medium">{order.user.username}</span>
                  </p>
                  <p>
                    Email:{" "}
                    <span className="font-medium">{order.user.email}</span>
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">User details not available</p>
              )}
            </div>

            {/* Displaying Items */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-700">Items</h3>
              {order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div
                    key={index}
                    className="border-t border-gray-300 pt-4 mt-4"
                  >
                    <h4 className="text-lg text-gray-800">
                      Dish: {item?.dish?.title}
                    </h4>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">
                      Modifiers:{" "}
                      {item.modifiers.length > 0
                        ? item.modifiers.map((mod) => mod.name).join(", ")
                        : "No modifiers"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items in this order</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersList;
