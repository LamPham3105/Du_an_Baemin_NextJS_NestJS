"use client";

import { ShoppingCartOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TypeSelector from "./type";
import AreaSelector from "./area";
import FilterSelector from "./filter";
import ResultFood from "./result";

const Page: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1); // You can manage page state if needed
  const [search, setSearch] = useState(""); // Manage search query if needed

  // Fetch data when the page or search term changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/restaurants/pagination",
          {
            params: {
              page: page || 1,
              limit: 10,
              search: query,
            },
          }
        );
        setItems(response.data); // Assuming response contains an array of items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItems();
  }, [page, search]);

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center border-b border-solid">
        <div className="flex flex-row gap-3">
          <AreaSelector />
          <TypeSelector />
        </div>
        <div className="flex items-center justify-center">
          <FilterSelector />
        </div>
      </div>
      <div className="my-3 flex flex-row">
        {/* Add any pagination or search input here */}
      </div>
      <ResultFood items={items} />
    </>
  );
};

export default Page;
