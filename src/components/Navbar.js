import { useState, useEffect, useRef } from "react";
import { FaPen, FaSearch, FaUsers } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import Link from "next/link";

export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    props.queryData(query);
  }, [query]);

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
    <div className="flex flex-col-reverse md:flex-row md:space-x-5 md:space-y-0">
      <div
        className="w-full flex bg-dark-second/50 p-5 py-3 md:py-5 border-b border-dark-third md:mt-0 md:rounded-md md:border space-x-5"
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
            placeholder={`${
              props.menu == "Posts"
                ? "Search post by keyword..."
                : "Search user by name..."
            }`}
            className={`w-full outline-none bg-transparent text-sm ${
              isOpen ? "text-light" : "text-light-second"
            }`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center justify-center rounded-full px-6  text-light bg-gradient-to-r from-blue-500/80 to-sky hover:shadow-lg hover:shadow-blue-600/40 duration-300 hover:-translate-y-1">
          <FaPen className="m-0 md:mr-3 scale-110" />
          <p className="font-semibold text-md hidden md:block lg:text-lg ">
            Create
          </p>
        </button>
      </div>
      <div className="w-full md:w-max flex bg-dark-second/50 p-5 py-3 md:py-5 border-y border-dark-third md:rounded-md md:border space-x-5">
        <Link
          href={"/user"}
          className={`${
            props.menu == "Users"
              ? "bg-gradient-to-r from-slate-300 to-light text-dark cursor-default"
              : "text-light-second/50 bg-transparent hover:bg-light-second/30 hover:text-light hover:shadow-lg hover:shadow-black/50 hover:-translate-y-1"
          } w-full inline-flex items-center justify-center rounded-full px-6 py-1 border border-light-second/50 duration-300 `}
        >
          <FaUsers className="mr-3 scale-125 md:scale-150" />
          <p className="font-semibold text-md lg:text-lg ">Users</p>
        </Link>

        <Link
          href={"/"}
          className={`${
            props.menu == "Posts"
              ? "bg-gradient-to-r from-slate-300 to-light text-dark cursor-default"
              : "text-light-second/50 bg-transparent hover:bg-light-second/30 hover:text-light hover:shadow-lg hover:shadow-black/50 hover:-translate-y-1"
          } w-full inline-flex items-center justify-center rounded-full px-6 py-1 border border-light-second/50 duration-300 `}
        >
          <MdSpaceDashboard className="mr-3 scale-125 md:scale-150" />
          <p className="font-semibold text-md lg:text-lg ">Posts</p>
        </Link>
      </div>
    </div>
  );
}
