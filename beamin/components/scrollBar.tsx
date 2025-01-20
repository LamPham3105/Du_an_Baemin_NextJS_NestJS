"use client";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState, useRef } from "react";
import Image from "next/image";

// Define the structure of each item in the items array
interface Item {
  url: string;
}

export default function ScrollBar({ items }: { items: Item[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState<boolean>(false); // Track image loading errors
  const containerRef = useRef<HTMLDivElement>(null);

  // Default image to use when an image fails to load
  const defaultImage = "/default-image.jpg"; // Use the correct path to your default image

  const handleNext = () => {
    if (containerRef.current) {
      if (items.length - 1 > currentIndex) setCurrentIndex(currentIndex + 1);
      containerRef.current.scrollBy({ left: 489, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
      containerRef.current.scrollBy({ left: -489, behavior: "smooth" });
    }
  };

  const handleImageError = () => {
    setImageError(true); // Mark the image as broken
  };

  return (
    <div className="w-full relative" style={{ height: "300px" }}>
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute hover:text-beamin hover:bg-slate-50 bg-white top-32 left-6 w-8 h-8 rounded-full z-20"
        >
          <LeftOutlined />
        </button>
      )}
      <div
        ref={containerRef}
        className="relative scroll-container flex bg-white rounded-2xl w-full p-4 gap-2"
        style={{ height: "300px" }}
      >
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-1/2 bg-blue-200 p-4 cursor-pointer"
            >
              <div className="relative w-full h-full">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={imageError ? defaultImage : item.url} // Use default image on error
                  alt={`Item ${index}`}
                  onError={handleImageError} // Handle image load errors
                />
              </div>
            </div>
          ))
        ) : (
          <div>No items available</div>
        )}
      </div>
      {currentIndex < items.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute hover:text-beamin hover:bg-slate-50 bg-white top-32 right-3 w-8 h-8 rounded-full z-20"
        >
          <RightOutlined />
        </button>
      )}
    </div>
  );
}
