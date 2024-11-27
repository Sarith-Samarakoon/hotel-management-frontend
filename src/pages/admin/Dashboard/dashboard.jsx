import React from "react";

export default function Dashboard() {
  const stats = [
    { label: "Total Bookings", value: 120, color: "bg-blue-500" },
    { label: "Categories", value: 8, color: "bg-green-500" },
    { label: "Rooms", value: 35, color: "bg-yellow-500" },
    { label: "Users", value: 240, color: "bg-red-500" },
    { label: "Feedback", value: 45, color: "bg-purple-500" },
    { label: "Gallery Items", value: 20, color: "bg-teal-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg shadow-lg text-white ${stat.color}`}
        >
          <h3 className="text-2xl font-bold">{stat.value}</h3>
          <p className="text-lg">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
