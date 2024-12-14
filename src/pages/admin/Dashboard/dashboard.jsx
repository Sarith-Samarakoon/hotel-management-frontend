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
            percentage: (bookings / 100) * 75, // Scale to 75%
            percentageDescription: `${((bookings / 100) * 75).toFixed(
              1
            )}% of booking capacity utilized`,
            gradient: "from-blue-500 to-blue-700",
            icon: <FaClipboardList size={30} />,
          },
          {
            label: "Categories",
            value: categories,
            percentage: (categories / 10) * 60, // Scale to 60%
            percentageDescription: `${((categories / 10) * 60).toFixed(
              1
            )}% of categories covered`,
            gradient: "from-green-500 to-green-700",
            icon: <FaStar size={30} />,
          },
          {
            label: "Rooms",
            value: rooms,
            percentage: (rooms / 50) * 90, // Scale to 90%
            percentageDescription: `${((rooms / 50) * 90).toFixed(
              1
            )}% of room capacity filled`,
            gradient: "from-yellow-500 to-yellow-700",
            icon: <FaHotel size={30} />,
          },
          {
            label: "Users",
            value: users,
            percentage: (users / 300) * 85, // Scale to 85%
            percentageDescription: `${((users / 300) * 85).toFixed(
              1
            )}% user growth achieved`,
            gradient: "from-red-500 to-red-700",
            icon: <FaUsers size={30} />,
          },
          {
            label: "Feedback",
            value: feedback,
            percentage: (feedback / 50) * 50, // Scale to 50%
            percentageDescription: `${((feedback / 50) * 50).toFixed(
              1
            )}% of expected feedback received`,
            gradient: "from-purple-500 to-purple-700",
            icon: <FaCommentDots size={30} />,
          },
          {
            label: "Gallery Items",
            value: galleryItems,
            percentage: (galleryItems / 30) * 40, // Scale to 40%
            percentageDescription: `${((galleryItems / 30) * 40).toFixed(
              1
            )}% of gallery capacity used`,
            gradient: "from-teal-500 to-teal-700",
            icon: <FaImages size={30} />,
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-32 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse rounded-lg"
              ></div>
            ))
          : stats.map((stat, index) => (
              <div
                key={index}
                className={`relative flex flex-row items-center p-5 rounded-lg shadow-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:shadow-2xl transition-transform transform hover:scale-105`}
              >
                {/* Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg mr-4">
                  {stat.icon}
                </div>

                {/* Value and Label */}
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-lg">
                    {stat.value}
                  </h3>
                  <p className="text-sm sm:text-lg font-semibold text-gray-100 opacity-80">
                    {stat.label}
                  </p>
                </div>

                {/* Progress Bar and Percentage Description */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex flex-1 items-center justify-center space-y-0">
                  {/* Circular Progress Bar */}
                  <CircularProgressbar
                    value={stat.percentage}
                    text={`${stat.percentage.toFixed(0)}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor:
                        stat.percentage >= 75
                          ? "#22c55e"
                          : stat.percentage >= 50
                          ? "#f59e0b"
                          : "#ef4444", // Green, Yellow, Red based on percentage
                      trailColor: "rgba(255, 255, 255, 0.2)", // Light trail
                      strokeWidth: 12, // Thick progress path for better visual impact
                    })}
                  />

                  {/* Percentage Description Text */}
                  <p className="mt-2 ml-2 text-xs sm:text-sm font-bold text-white bg-opacity-80 rounded-lg p-2 text-center shadow-lg">
                    {stat.percentageDescription}
                  </p>
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
