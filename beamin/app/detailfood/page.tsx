"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function DetailFoodPage() {
  const [restaurantData, setRestaurantData] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [filteredFoods, setFilteredFoods] = useState<any[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("query"); // Fetch the 'id' from the URL query params

    if (id) {
      // Use axios to fetch data from your API endpoint
      axios
        .get(`http://localhost:8080/restaurants/${id}`)
        .then((response) => {
          setRestaurantData(response.data);
          setFilteredFoods(response.data.foods); // Initialize filtered foods with all items
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []); // Empty dependency array ensures this runs only once on mount.

  useEffect(() => {
    if (restaurantData && search) {
      // Filter foods based on search query
      const filtered = restaurantData.foods.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFoods(filtered);
    } else if (restaurantData) {
      // If search is cleared, show all foods
      setFilteredFoods(restaurantData.foods);
    }
  }, [search, restaurantData]);

  if (!restaurantData) {
    return <div>No data found.</div>;
  }

  return (
    <div className="flex flex-col w-full h-auto">
      <div className="bg-white w-full h-80 flex">
        <div className="w-[45%] h-full py-4 px-10">
          <div className="w-full relative h-full">
            <Image
              layout="fill"
              objectFit="cover"
              src={restaurantData.foods[0]?.image_url || "/default-image.png"} // Default image if no food image
              alt={restaurantData.foods[0]?.name || "Food Item"} // Default name if no food name
            />
          </div>
        </div>
        <div className="w-[55%] h-full relative">
          <div className="absolute top-0 left-0 px-8 py-4">
            <span className="text-[13px] text-[#187CAA]">
              <a href="">Home</a> &gt; <a href="">{restaurantData.city}</a>
            </span>
            <div className="text-[22px] font-bold mt-2">
              {restaurantData.name}
            </div>
            <div className="text-[13px] mt-1">{restaurantData.address}</div>
            <div className="flex flex-row gap-4 justify-start items-center my-1 text-[15px]">
              <div className="flex flex-row gap-1 text-[#6CC942] justify-start items-center">
                <div className="w-2 h-2 bg-[#6CC942] rounded-full"></div>
                <span>Open</span>
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <span>
                  {restaurantData.open_time.split("T")[1]} -{" "}
                  {restaurantData.close_time.split("T")[1]}
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-1 justify-start items-center text-[#959595] text-[15px]">
              <span>Rating: {restaurantData.average_rating}</span> (
              {restaurantData.ratings_count} reviews)
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="py-[13px] px-[26px] font-bold text-beamin text-[14px]">
          MENU
        </div>
        <div className="w-full flex flex-row gap-3">
          <div className="w-[20%] bg-white p-5">
            <ul>
              <li className="cursor-pointer w-fit px-1">NEW PRODUCTS</li>
            </ul>
          </div>
          <div className="w-[50%] h-auto bg-white py-3 flex flex-col px-4">
            <div className="w-full mb-5">
              <Input
                addonBefore={<PlusOutlined />}
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full pl-1 gap-3">
              <div className="font-medium">DISCOUNTED ITEMS</div>
              {filteredFoods.length === 0 ? (
                <div>No food items match your search.</div>
              ) : (
                filteredFoods.map((item: any) => (
                  <div key={item.id} className="flex flex-row mb-4">
                    <div className="w-[15%] relative h-16">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src={item.image_url}
                        alt={item.name}
                      />
                    </div>
                    <div className="w-[60%] flex flex-col gap-1 px-2">
                      <span className="font-bold text-[#464646]">
                        {item.name}
                      </span>
                      <span className="text-wrap text-sm text-[#464646]">
                        {item.description}
                      </span>
                    </div>
                    <div className="w-[15%] flex justify-center items-center">
                      <span className="text-[#0288d1] font-bold text-base">
                        {item.price}đ
                      </span>
                    </div>
                    <div className="w-[10%] flex justify-center items-center">
                      <div className="h-6 w-6 rounded-md flex justify-center items-center bg-beamin text-white font-bold cursor-pointer hover:brightness-110">
                        <PlusOutlined />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
