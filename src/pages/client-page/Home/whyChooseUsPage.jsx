import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

function WhyChooseUs() {
  const items = [
    {
      title: "Desert",
      image:
        "https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Desert.webp",
    },
    {
      title: "Coffee",
      image:
        "https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Coffee.webp",
    },
    {
      title: "Catering",
      image:
        "https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Catering.webp",
    },
    {
      title: "Services",
      image:
        "https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Services.webp",
    },
    {
      title: "Luxurious Rooms",
      image:
        "https://i.pinimg.com/736x/78/48/cd/7848cd955979662e226e4d2093692ae0.jpg",
    },
    {
      title: "Poolside Relaxation",
      image:
        "https://i.pinimg.com/736x/40/90/8b/40908b8f3f2a1701809710e93488dbbe.jpg",
    },
    {
      title: "Event Halls",
      image:
        "https://i.pinimg.com/736x/9d/78/0c/9d780cd1634c1ce20ec45a977940395d.jpg",
    },
    {
      title: "Gym & Spa",
      image:
        "https://i.pinimg.com/736x/23/5c/c9/235cc993ae9afe53acfd5c56f9472251.jpg",
    },
  ];

  const [showAll, setShowAll] = useState(false);

  const handleToggleView = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  return (
    <div className="py-16 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold text-center mb-8 text-black flex items-center justify-center gap-4">
        <FaArrowRight className="text-orange-500 text-5xl" />
        <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
          Why Choose Us?
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {(showAll ? items : items.slice(0, 4)).map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <span className="text-white text-lg font-bold">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleToggleView}
        className="mt-8 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all"
      >
        {showAll ? "View Less" : "View More"}
      </button>
    </div>
  );
}

export default WhyChooseUs;
