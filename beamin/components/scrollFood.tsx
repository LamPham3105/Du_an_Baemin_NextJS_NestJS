"use client";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Item {
  img: string;
  name: string;
  address: string;
  kind: string;
}

interface ScrollFoodProps {
  items: {
    title: string;
    items: Item[];
  }[];
}

export default function ScrollFood({ items }: ScrollFoodProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNavigate = () => {
    router.push("/detailfood");
  };

  const handleNext = () => {
    if (containerRef.current) {
      setCurrentIndex((prev) => Math.min(prev + 1, items[0].items.length - 1));
      containerRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      containerRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  return (
    <div
      className="bg-white rounded-2xl w-full shadow-lg p-4"
      style={{ height: "340px" }}
    >
      {items.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <div className="text-xl font-bold mb-4 text-gray-800">
            {category.title}
          </div>
          <div className="relative flex items-center">
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full"
              >
                <LeftOutlined />
              </button>
            )}
            <div
              ref={containerRef}
              className="flex flex-row gap-10 overflow-x-auto scrollbar-hide px-8"
            >
              {category.items.map((item, index) => (
                <div
                  key={index}
                  onClick={handleNavigate}
                  className="group w-60 min-w-[240px] h-full cursor-pointer"
                >
                  <div className="w-full h-2/3 relative rounded-lg overflow-hidden">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={item.img || "/images/default.jpg"}
                      alt={item.name}
                      className="rounded-lg group-hover:brightness-75 transition duration-300"
                    />
                  </div>
                  <div className="bg-white flex flex-col items-center px-4 py-3 border border-gray-200 rounded-b-lg">
                    <div className="text-base font-semibold text-gray-800 truncate w-full text-center">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500 truncate w-full text-center">
                      {item.address}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {currentIndex < category.items.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full"
              >
                <RightOutlined />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
