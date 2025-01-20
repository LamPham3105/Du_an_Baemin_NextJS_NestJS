"use client";

import React, { useEffect, useState } from "react";
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";

type Food = {
  id: string;
  name: string;
  image_url: string;
  category: { name: string };
};

type Restaurant = {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  foods: Food[];
};

type Category = {
  id: string;
  name: string;
};

type Item = {
  id: string;
  name: string;
  address: string;
  img: string;
  kind: string;
};

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [restaurantRes, categoryRes] = await Promise.all([
          fetch("http://localhost:8080/restaurants"),
          fetch("http://localhost:8080/categories"),
        ]);

        const restaurantsData = await restaurantRes.json();
        const categoriesData = await categoryRes.json();

        setRestaurants(restaurantsData || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 pt-3 pl-8 pr-8 z-40">
          <div className="flex flex-col fixed bg-white w-64 rounded-2xl pl-3 pt-2 pb-5 gap-3">
            <span>Thực đơn</span>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex flex-row items-center gap-1">
                    <span>{category.name}</span>
                  </div>
                </div>
              ))
            ) : (
              <div>No categories available</div>
            )}
          </div>
        </div>

        <div className="col-span-9 w-full pt-3 pr-8 gap-3 flex flex-col">
          {restaurants && restaurants.length > 0 ? (
            <>
              <ScrollBar
                items={restaurants.map((r) => ({
                  id: r.id,
                  name: r.name,
                  url: r.imageUrl,
                }))}
              />
              <ScrollFood
                items={restaurants.map((r) => ({
                  title: r.name,
                  items:
                    Array.isArray(r.foods) && r.foods.length > 0
                      ? r.foods.map((food) => ({
                          id: food.id,
                          name: food.name,
                          address: r.address,
                          img: food.image_url,
                          kind: food.category?.name || "Unknown",
                        }))
                      : [],
                }))}
              />
            </>
          ) : (
            <div>No restaurants available</div>
          )}
        </div>
      </div>
    </>
  );
}
