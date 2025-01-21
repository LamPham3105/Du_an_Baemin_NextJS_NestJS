"use client";

import { ShoppingCartOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TypeSelector from "./type";
import AreaSelector from "./area";
import FilterSelector from "./filter";
import ResultFood from "./result";

const Page: React.FC = () => {
  const [items, setItems] = useState<any[]>([]); // Initialize as an empty array
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    // Extract the search query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");

    // Update the search state if query exists in the URL
    if (query && query !== search) {
      setSearch(query);
    }

    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/restaurants/pagination",
          {
            params: {
              page: page || 1,
              limit: 10,
              search: query || search, // Use either query or state search
            },
          }
        );
        setItems(response.data || []); // Ensure the data is an array
      } catch (error) {
        console.error("Error fetching data:", error);
        setItems([]); // Set an empty array in case of error
      }
    };

    fetchItems();
  }, [page, search]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Update page state when page changes
  };

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
        {/* Optional: Add a pagination component */}
        <div className="flex justify-center w-full">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="mx-3">{page}</span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="w-full text-center text-gray-500">Loading...</div>
      ) : (
        <ResultFood items={items} />
      )}
    </>
  );
};

export default Page;
