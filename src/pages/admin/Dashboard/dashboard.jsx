import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  FaUsers,
  FaHotel,
  FaStar,
  FaCommentDots,
  FaImages,
  FaClipboardList,
} from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // Import default styles
import axios from "axios";
import "./dashboard.css";

export default function Dashboard() {
  const stats = [
    {
      label: "Total Bookings",
      value: 120,
      percentage: 75,
      gradient: "bg-gradient-to-r from-blue-500 to-blue-700",
      icon: <FaClipboardList size={35} />,
    },
    {
      label: "Categories",
      value: 8,
      percentage: 60,
      gradient: "bg-gradient-to-r from-green-500 to-green-700",
      icon: <FaStar size={35} />,
    },
    {
      label: "Rooms",
      value: 35,
      percentage: 90,
      gradient: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      icon: <FaHotel size={35} />,
    },
    {
      label: "Users",
      value: 240,
      percentage: 85,
      gradient: "bg-gradient-to-r from-red-500 to-red-700",
      icon: <FaUsers size={35} />,
    },
    {
      label: "Feedback",
      value: 45,
      percentage: 50,
      gradient: "bg-gradient-to-r from-purple-500 to-purple-700",
      icon: <FaCommentDots size={35} />,
    },
    {
      label: "Gallery Items",
      value: 20,
      percentage: 40,
      gradient: "bg-gradient-to-r from-teal-500 to-teal-700",
      icon: <FaImages size={35} />,
    },
  ];

  const [date, setDate] = useState(new Date());
  const [feedbacks, setFeedbacks] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Redirect to login if no token is found
  if (!token) {
    window.location.href = "/login";
  }

  // Fetch feedback data
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the Authorization header
        },
      })
      .then((res) => {
        const feedbackData = res.data.feedback || [];
        // Filter for 5-star ratings and sort by createdAt in descending order
        const filteredFeedbacks = feedbackData
          .filter((feedback) => feedback.rating === 5)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        setFeedbacks(filteredFeedbacks);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
        setError("Failed to load feedback.");
        setIsLoading(false);
      });
  }, [token]);

  // Fetch event data
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEvents(res.data.events || []);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      });
  }, [token]);

  return (
    <div className="p-0 space-y-4">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`relative flex flex-row items-center p-6 rounded-xl shadow-lg text-white ${stat.gradient} transition-transform transform hover:scale-105`}
          >
            <div className="w-16 h-16 flex items-center justify-center bg-white text-black rounded-full shadow-lg mr-4">
              {stat.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-lg font-medium">{stat.label}</p>
            </div>
            <div className="w-16 h-16">
              <CircularProgressbar
                value={stat.percentage}
                text={`${stat.percentage}%`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: "#ffffff",
                  trailColor: "rgba(255, 255, 255, 0.3)",
                })}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Calendar and Feedback Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-2 rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white flex">
          {/* Calendar Section */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-4 mr-4">
            <h3 className="text-2xl font-bold mb-4 text-center text-indigo-700">
              Calendar
            </h3>
            <Calendar
              onChange={setDate}
              value={date}
              className="custom-calendar mx-auto"
              tileClassName={({ date, view }) =>
                view === "month" && date.getDay() === 0
                  ? "highlight-sunday"
                  : "default-tile"
              }
            />
            <p className="text-center mt-4 text-indigo-700">
              <strong>Selected Date:</strong> {date.toDateString()}
            </p>
          </div>

          {/* Upcoming Events Section */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
            {events.length === 0 ? (
              <p>No upcoming events</p>
            ) : (
              <div className="space-y-4">
                {events.slice(0, 5).map((event) => (
                  <div
                    key={event._id}
                    className="flex items-center bg-white text-black p-4 rounded-lg shadow-md"
                  >
                    {/* Event Image */}
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-16 h-16 rounded-lg shadow-md mr-4 object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-300 rounded-lg shadow-md mr-4 flex items-center justify-center">
                        <span className="text-sm text-gray-500">No Image</span>
                      </div>
                    )}
                    {/* Event Details */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">
                        {event.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Start Date:{" "}
                        {new Date(event.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <h3 className="text-xl font-bold mb-4">Top Feedbacks</h3>
          {isLoading ? (
            <p>Loading feedback...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div
                  key={feedback._id}
                  className="flex items-start bg-white text-black p-4 rounded-lg shadow-md"
                >
                  {/* Profile Image */}
                  <img
                    src={feedback.userProfileImage}
                    alt={feedback.userName}
                    className="w-16 h-16 rounded-full shadow-lg mr-4"
                  />
                  {/* Feedback Content */}
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">
                          {feedback.userName}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {feedback.userEmail}
                        </p>
                        <div className="flex items-center mt-2">
                          {Array.from({ length: feedback.rating }).map(
                            (_, i) => (
                              <FaStar
                                key={i}
                                className="text-yellow-500 mr-1"
                              />
                            )
                          )}
                        </div>
                      </div>
                      {/* Message */}
                      <p className="flex-1 text-gray-700 ml-10">
                        {feedback.message}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(feedback.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
