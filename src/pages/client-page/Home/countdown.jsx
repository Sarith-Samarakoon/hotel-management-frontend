import { useState, useEffect } from "react";

function Countdown({ startDate, endDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [eventStatus, setEventStatus] = useState("upcoming"); // Track event status

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const eventStartDate = new Date(startDate);
      const eventEndDate = new Date(endDate);
      const difference = eventStartDate - now;

      if (now < eventStartDate) {
        // Event is upcoming
        setEventStatus("upcoming");
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else if (now >= eventStartDate && now <= eventEndDate) {
        // Event is ongoing
        setEventStatus("ongoing");
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        // Event has ended
        setEventStatus("ended");
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [startDate, endDate]);

  // Render different messages based on the event status
  const renderCountdown = () => {
    if (eventStatus === "upcoming") {
      return (
        <div className="flex items-center justify-center space-x-2 text-lg font-semibold text-gray-700">
          {timeLeft.days > 0 && (
            <div className="flex flex-col items-center bg-gray-200 rounded-lg px-4 py-2 shadow-md">
              <span className="text-2xl font-bold text-gray-800">
                {timeLeft.days}
              </span>
              <span className="text-sm uppercase text-gray-500">Days</span>
            </div>
          )}
          <div className="flex flex-col items-center bg-gray-200 rounded-lg px-4 py-2 shadow-md">
            <span className="text-2xl font-bold text-gray-800">
              {timeLeft.hours}
            </span>
            <span className="text-sm uppercase text-gray-500">Hours</span>
          </div>
          <div className="flex flex-col items-center bg-gray-200 rounded-lg px-4 py-2 shadow-md">
            <span className="text-2xl font-bold text-gray-800">
              {timeLeft.minutes}
            </span>
            <span className="text-sm uppercase text-gray-500">Minutes</span>
          </div>
          <div className="flex flex-col items-center bg-gray-200 rounded-lg px-4 py-2 shadow-md">
            <span className="text-2xl font-bold text-gray-800">
              {timeLeft.seconds}
            </span>
            <span className="text-sm uppercase text-gray-500">Seconds</span>
          </div>
        </div>
      );
    }

    if (eventStatus === "ongoing") {
      return (
        <div className="text-lg font-semibold text-green-500">
          <span className="text-3xl font-bold">Event is now live!</span>
        </div>
      );
    }

    if (eventStatus === "ended") {
      return (
        <div className="text-lg font-semibold text-red-500">
          <span className="text-3xl font-bold">The event has ended.</span>
        </div>
      );
    }
  };

  return <>{renderCountdown()}</>;
}

export default Countdown;
