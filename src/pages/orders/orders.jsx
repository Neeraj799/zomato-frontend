import React, { useEffect, useState } from "react";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  const statusOptions = [
    "PENDING",
    "CONFIRMED",
    "PREPARING",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:4000/admin/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update the local state after successful API call
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "PREPARING":
        return "bg-purple-100 text-purple-800";
      case "OUT_FOR_DELIVERY":
        return "bg-indigo-100 text-indigo-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

            <div className="mt-4 flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                  order.status
                )}`}
              >
                Current Status: {order.status}
              </span>

              <div className="flex items-center gap-2">
                <label
                  htmlFor={`status-${order._id}`}
                  className="text-gray-700 font-medium"
                >
                  Update Status:
                </label>
                <select
                  id={`status-${order._id}`}
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-700">
                User Information
              </h3>
              {order.user ? (
                <div className="text-gray-600">
                  <p>
                    Username:{" "}
                    <span className="font-medium">{order.fullName}</span>
                  </p>
                  <p>
                    Mobile: <span className="font-medium">{order.mobile}</span>
                  </p>
                  <p>
                    Address:{" "}
                    <span className="font-medium">{order.address}</span>
                  </p>
                  <p>
                    City: <span className="font-medium">{order.city}</span>
                  </p>
                  <p>
                    State: <span className="font-medium">{order.state}</span>
                  </p>
                  <p>
                    Pincode:{" "}
                    <span className="font-medium">{order.pincode}</span>
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
                    <p className="text-gray-600">Price: {item?.dish?.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">
                      Modifiers:{" "}
                      {item.modifiers.length > 0
                        ? item.modifiers.map((mod) => mod.name).join(", ")
                        : "No modifiers"}
                    </p>
                    <p>
                      Status:{" "}
                      <span className="font-medium">{order.status}</span>
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
