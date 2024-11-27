import { useState, useRef, useEffect } from "react";
import Dropdown from "./Dropdown";

const YearRangeDropdown = ({ startYear, endYear, onYearChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const yearOptions = Array.from({ length: 2024 - 2008 + 1 }, (_, i) => 2008 + i);

  const handleYearChange = (type, value) => {
    const numericValue = Number(value);

    if (type === "startYear" && numericValue <= endYear) {
      onYearChange(type, numericValue);
    } else if (type === "endYear" && numericValue >= startYear) {
      onYearChange(type, numericValue);
    }
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // close dropdown when clicking outside
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="btn border-black">
        {startYear} ~ {endYear}
      </button>
      {isOpen && (
        <div className="absolute bg-white border rounded-3xl shadow-lg z-10 w-60 p-4">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm mb-1">Start Year</p>
              <Dropdown
                label="Select Start Year"
                options={yearOptions.filter((year) => year <= endYear)} // filter out invalid years
                selected={startYear.toString()}
                onChange={(value) => handleYearChange("startYear", value)}
                containerClass={"btn border-black"}

              />
            </div>
            <div>
              <p className="text-sm mb-1">End Year</p>
              <Dropdown
                label="Select End Year"
                options={yearOptions.filter((year) => year >= startYear)} // filter out invalid years
                selected={endYear.toString()}
                onChange={(value) => handleYearChange("endYear", value)}
                containerClass={"btn border-black"}

              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearRangeDropdown;
