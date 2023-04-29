import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

export default function User() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  //Pagination
  const [pageCount, setPageCount] = useState(104);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 27;

  //Get data
  useEffect(() => {
    (async () => {
      try {
        const usersRes = await fetch(
          `https://gorest.co.in/public/v2/users?page=${pageNumber}&per_page=${itemsPerPage}&name=${query}`
        );
        const usersData = await usersRes.json();
        setUsers(usersData);

        const totalPages = parseInt(usersRes.headers.get("X-Pagination-Pages"));
        if (totalPages > pageCount) {
          setPageCount(104);
        } else {
          setPageCount(totalPages);
        }

        console.log(usersData);
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
    <div className="flex flex-col justify-between h-full py-5 bg-dark md:px-16 lg:px-32 xl:px-80 min-h-screen">
      <div className=" space-y-5">
        <Navbar menu="Users" queryData={setQuery} />
        <div className="flex flex-col md:grid grid-cols-3 gap-2 md:gap-5">
          {users.map((user) => (
            <Link href={`/user/${user.id}`}>
              <div className="flex justify-between hover:-translate-y-1 duration-500 cursor-pointer hover:bg-dark-third/50 bg-dark-second/50 p-5 px-5 border-y border-dark-third md:rounded-md md:border items-center hover:shadow-lg hover:shadow-black/50">
                <p className="text-md md:text-lg font-bold text-sky">
                  {user.name}
                </p>
                <p className="text-md md:text-lg text-light-second/50 italic">
                  id: {user.id}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

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
