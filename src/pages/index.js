import { useState, useEffect, useRef } from "react";
import { FaSearch, FaPen, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Card from "@/components/Card";
import ReactPaginate from "react-paginate";

export default function Home() {
  const [posts, setPosts] = useState([]);

  // Search
  const [filteredResults, setFilteredResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  //Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  //Search
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

  useEffect(() => {
    setFilteredResults(
      posts.filter(
        (item) =>
          item.body.toLowerCase().includes(query.toLowerCase()) ||
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.username.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [posts, query]);

  //Get data
  useEffect(() => {
    (async () => {
      try {
        const usersRes = await fetch(
          "https://gorest.co.in/public/v2/users?page=1&per_page=100"
        );
        const usersData = await usersRes.json();

        const postsRes = await fetch(
          "https://gorest.co.in/public/v2/posts?page=1&per_page=50"
        );
        const postsData = await postsRes.json();

        const commentsRes = await fetch(
          "https://gorest.co.in/public/v2/comments"
        );
        const commentsData = await commentsRes.json();

        const updatedPostsData = postsData.map((item) => ({
          ...item,
          username:
            usersData.find((user) => user.id === item.user_id)?.name ||
            "User" + item.user_id,
          comments: [
            commentsData.find((comment) => comment.post_id === item.id)?.body ||
              "There is no comment yet",
          ],
        }));

        setPosts(updatedPostsData);
        console.log(updatedPostsData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  //Pagination
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredResults.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredResults.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, currentItems]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    setItemOffset(newOffset);
    console.log(currentItems);
  };

  return (
    <div className="flex flex-col h-full py-10 space-y-5 bg-dark md:px-32 xl:px-56 min-h-screen">
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

      {currentItems.map((item) => (
        <Card post={item} />
      ))}

      <ReactPaginate
        breakLabel="..."
        nextLabel={<FaChevronRight />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel={<FaChevronLeft />}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="prev-num-btn"
        nextLinkClassName="next-num-btn"
        activeLinkClassName="activePage"
        breakClassName="break-me"
      />
    </div>
  );
}
