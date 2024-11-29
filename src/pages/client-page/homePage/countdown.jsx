import { useState, useEffect } from "react";
function Countdown({ startDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const eventDate = new Date(startDate);
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

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

export default Countdown;
