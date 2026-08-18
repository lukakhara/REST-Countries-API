import React, { useState } from "react";

const FilterBar = ({ filter, setFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const regions = ["all", "Africa", "Americas", "Asia", "Europe", "Oceania"];
 
  
  return (
    <div className="relative w-[70%] max-w-[200px] elements-bg mb-2 rounded-[5px]">
      {/* Custom select button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-4  rounded shadow-md 
                 text-text bg-elements focus:outline-none focus:ring-2 
                 focus:ring-blue-500 flex justify-between items-center"
      >
        {filter === "all" ? "Filter by Region" : filter}
        <svg
          className={`w-5 h-5  transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Custom dropdown options */}
      {isOpen && (
        <div className="absolute z-10 bg-white w-full mt-1 rounded-md shadow-lg bg-elements elements-bg">
          <div className="py-1">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => {
                  setFilter(region);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-text cursor-pointer  dropdownSelectHover    ${
                  filter === region ? "dropdownSelect  text-white" : ""
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
