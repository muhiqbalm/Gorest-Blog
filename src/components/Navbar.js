import { useState, useEffect, useRef } from "react";
import { FaPen, FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.getElementById("search-input").focus();
    }
  }, [isOpen]);

  const handleOutsideClick = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
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
    <div
      className="w-full flex space-x-5 bg-dark-second/50 p-5 border-y border-dark-third md:rounded-md md:border"
      ref={searchRef}
    >
      <div
        className={`flex items-center px-4 py-2 w-full border rounded-full transition duration-500 ${
          isOpen ? "border-sky bg-dark-third/50" : "border-light-second/70"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaSearch className="text-light-second mr-3" />
        <input
          id="search-input"
          type="text"
          placeholder="Search by keyword or username..."
          className={`w-full outline-none bg-transparent text-sm ${
            isOpen ? "text-light" : "text-light-second"
          }`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button className="inline-flex items-center justify-center rounded-full px-5 font-semibold text-lg text-light bg-gradient-to-r from-blue-500/80 to-sky hover:shadow-lg hover:shadow-blue-600/40 duration-300 hover:-translate-y-1">
        <FaPen className="mr-2" /> Create
      </button>
    </div>
  );
}
