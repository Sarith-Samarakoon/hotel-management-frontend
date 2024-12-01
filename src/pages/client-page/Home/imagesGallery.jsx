import React, { useState } from "react";
import "./imageGallery.css";
import { FaBed } from "react-icons/fa";

const ImageGallery = () => {
  const firstSliderImages = [
    "https://i.pinimg.com/474x/47/0d/17/470d17ee0723a9666e01c91271b23237.jpg",
    "https://i.pinimg.com/736x/5b/78/e0/5b78e033387715813ebdedd1a4c0792b.jpg",
    "https://i.pinimg.com/736x/80/cf/45/80cf45c8bf5d0b1d01bb14f020fffcfd.jpg",
    "https://i.pinimg.com/736x/96/74/d8/9674d858570a63bcccbc632fbcb5e8f1.jpg",
    "https://i.pinimg.com/736x/9a/31/e8/9a31e86a8ef4a3f6c0d554b2e76bf44c.jpg",
    "https://i.pinimg.com/736x/a3/46/12/a346126b8cabffaf679148c47045a998.jpg",
    "https://i.pinimg.com/736x/d6/57/cf/d657cf8ecc4ccf0f13f92ec16e108006.jpg",
    "https://i.pinimg.com/736x/a0/6a/23/a06a2390fd44f663edc132bd99d936b9.jpg",
    "https://i.pinimg.com/736x/55/3a/3b/553a3b9ae35eea878a816d0818465036.jpg",
    "https://i.pinimg.com/736x/e1/f1/50/e1f150ddf1410df62e012f5414eecb92.jpg",
  ];

  const secondSliderImages = [
    "https://i.pinimg.com/736x/b7/1b/99/b71b999b02b63fc48def53dd4bef4dda.jpg",
    "https://i.pinimg.com/474x/a3/fd/86/a3fd8611722347f95d520fa3295832d7.jpg",
    "https://i.pinimg.com/736x/44/2b/0b/442b0b3c0e07fd5c565b22df2b72e80d.jpg",
    "https://i.pinimg.com/736x/69/4a/64/694a6458fdf632118fb1b4b16d514b3b.jpg",
    "https://i.pinimg.com/736x/f2/95/96/f29596d20f7c8f0b84bdfefb1cd2f888.jpg",
    "https://i.pinimg.com/736x/dd/6e/7a/dd6e7a825f8c096d20f781366cfa13c7.jpg",
    "https://i.pinimg.com/736x/aa/c0/d8/aac0d8793ada02d445521270c5797cb2.jpg",
    "https://i.pinimg.com/736x/e2/43/f6/e243f61ec84f092077f5c06e60e69d59.jpg",
    "https://i.pinimg.com/736x/9e/69/81/9e6981c9ff9de59b64c51e8c2a0ff39e.jpg",
    "https://i.pinimg.com/736x/dc/74/9e/dc749e34d70cb893e700c1b000acb372.jpg",
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentSlider, setCurrentSlider] = useState("first");

  const openModal = (index, slider) => {
    setSelectedIndex(index);
    setCurrentSlider(slider);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const nextImage = () => {
    const images =
      currentSlider === "first" ? firstSliderImages : secondSliderImages;
    setSelectedIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    const images =
      currentSlider === "first" ? firstSliderImages : secondSliderImages;
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-8 text-black flex items-center justify-center gap-4">
        <FaBed className="text-pink-500 text-5xl" />
        <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Our Gallery
        </span>
      </h2>

      {/* First image slider (scrolls to the left) */}
      <div className="relative overflow-hidden">
        <div className={`flex space-x-1 animate-scroll-left`}>
          {firstSliderImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
              onClick={() => openModal(index, "first")}
            >
              <img
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Second image slider (scrolls to the right) */}
      <div className="relative overflow-hidden mt-6">
        <div className={`flex space-x-1 animate-scroll-right`}>
          {secondSliderImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
              onClick={() => openModal(index, "second")}
            >
              <img
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for full-size image view */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={
                currentSlider === "first"
                  ? firstSliderImages[selectedIndex]
                  : secondSliderImages[selectedIndex]
              }
              alt={`Gallery Image ${selectedIndex + 1}`}
              className="max-w-full max-h-screen rounded-lg"
            />
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-gray-800 hover:bg-gray-600 p-2 rounded-full shadow-md"
            >
              &#10005;
            </button>
            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-600"
            >
              &#8592;
            </button>
            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-600"
            >
              &#8594;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
