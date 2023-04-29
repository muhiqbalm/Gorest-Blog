import { useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Post from "@/components/Post";
import ReactPaginate from "react-paginate";
import Navbar from "@/components/Navbar";

export default function Home() {
  //Post
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState([]);

  //Pagination
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 5;

  //Get data
  useEffect(() => {
    (async () => {
      try {
        const postsRes = await fetch(
          `https://gorest.co.in/public/v2/posts?page=${pageNumber}&per_page=${itemsPerPage}&body=${query}`
        );
        const postsData = await postsRes.json();

        setPosts(postsData);

        const totalPages = parseInt(postsRes.headers.get("X-Pagination-Pages"));
        setPageCount(totalPages);
        console.log(postsData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [pageNumber, query]);

  //handle pagination
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected + 1);
  };

  return (
    <div className="flex flex-col h-full py-5 bg-dark md:px-16 lg:px-32 xl:px-80 min-h-screen space-y-5">
      <Navbar menu="Posts" queryData={setQuery} />

      {posts.map((item) => (
        <Post post={item} key={item.id} />
      ))}

      <ReactPaginate
        breakLabel="..."
        nextLabel={<FaChevronRight />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel={<FaChevronLeft />}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="prev-num-btn"
        nextLinkClassName="next-num-btn"
        activeLinkClassName="activePage"
        breakClassName="break-me"
        marginPagesDisplayed={2}
      />
    </div>
  );
}
