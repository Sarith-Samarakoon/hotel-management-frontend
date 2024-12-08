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
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import "./dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState([]);
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

  // Fetch stats data
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/stat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { bookings, categories, rooms, users, feedback, galleryItems } =
          res.data;

        const updatedStats = [
          {
            label: "Total Bookings",
            value: bookings,
            percentage: (bookings / 100) * 75, // Example scaling logic
            gradient: "bg-gradient-to-r from-blue-500 to-blue-700",
            icon: <FaClipboardList size={35} />,
          },
          {
            label: "Categories",
            value: categories,
            percentage: (categories / 10) * 60,
            gradient: "bg-gradient-to-r from-green-500 to-green-700",
            icon: <FaStar size={35} />,
          },
          {
            label: "Rooms",
            value: rooms,
            percentage: (rooms / 50) * 90,
            gradient: "bg-gradient-to-r from-yellow-500 to-yellow-700",
            icon: <FaHotel size={35} />,
          },
          {
            label: "Users",
            value: users,
            percentage: (users / 300) * 85,
            gradient: "bg-gradient-to-r from-red-500 to-red-700",
            icon: <FaUsers size={35} />,
          },
          {
            label: "Feedback",
            value: feedback,
            percentage: (feedback / 50) * 50,
            gradient: "bg-gradient-to-r from-purple-500 to-purple-700",
            icon: <FaCommentDots size={35} />,
          },
          {
            label: "Gallery Items",
            value: galleryItems,
            percentage: (galleryItems / 30) * 40,
            gradient: "bg-gradient-to-r from-teal-500 to-teal-700",
            icon: <FaImages size={35} />,
          },
        ];

        setStats(updatedStats);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
        setError("Failed to load stats");
        setIsLoading(false);
      });

    // Fetch feedback data
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
    // Fetch events and get the top 4 closest
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const sortedEvents = (res.data.events || [])
          .filter((event) => new Date(event.startDate) > new Date())
          .sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          )
          .slice(0, 3); // Get top 4 closest events
        setEvents(sortedEvents);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      });
  }, [token]);

  return (
    <div className="p-0 space-y-4">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-32 bg-gray-300 animate-pulse rounded-xl"
              ></div>
            ))
          : stats.map((stat, index) => (
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
                    text={`${stat.percentage.toFixed(0)}%`}
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
        {/* Calendar Section */}
        <div className="p-4 lg:p-6 rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Calendar (Visible only on xl and larger screens) */}
            <div className="hidden 2xl:block flex-1 bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-indigo-700">
                Calendar
              </h3>
              <Calendar
                onChange={setDate}
                value={date}
                className="custom-calendar mx-auto text-black"
              />
              <p className="text-center mt-4 text-indigo-700">
                <strong>Selected Date:</strong> {date.toDateString()}
              </p>
            </div>

            {/* Upcoming Events */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-indigo-700 text-center xl:text-left">
                Upcoming Events
              </h3>
              {events.length === 0 ? (
                <p className="text-gray-600 text-center xl:text-left">
                  No upcoming events
                </p>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event._id}
                      className="flex flex-col sm:flex-row items-center bg-gray-100 text-gray-800 p-4 rounded-lg shadow-md gap-4"
                    >
                      {event.image ? (
                        <img
                          src={event.image}
                          alt={event.name}
                          className="w-20 h-20 rounded-lg shadow-md object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
                          <span className="text-sm text-gray-500">
                            No Image
                          </span>
                        </div>
                      )}
                      <div className="text-center sm:text-left">
                        <h4 className="text-lg font-bold">{event.name}</h4>
                        <p className="text-sm text-gray-600">
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
        </div>

        {/* Feedback Section */}
        <div className="p-4 lg:p-6 rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
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
                  className="flex flex-col lg:flex-row items-start bg-white text-black p-4 rounded-lg shadow-md"
                >
                  <img
                    src={feedback.userProfileImage}
                    alt={feedback.userName}
                    className="w-16 h-16 rounded-full shadow-lg mr-4 mb-4 lg:mb-0"
                  />
                  <div className="flex flex-col flex-1">
                    <div className="flex flex-col lg:flex-row justify-between">
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
                      <p className="mt-4 lg:mt-0 lg:ml-10 text-gray-700">
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
