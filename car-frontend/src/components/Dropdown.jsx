import { useState, useRef, useEffect } from "react";

const Dropdown = ({ label, options, selected, onChange, containerClass, itemClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`px-4 py-2 ${containerClass}`}
      >
        {selected || label}
      </button>
      {isOpen && (
        <div
          className={`absolute bg-white border rounded-3xl shadow-lg z-10 max-h-60 overflow-auto dropdown-scrollable ${itemClass}`}
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
