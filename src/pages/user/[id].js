import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { MdEmail } from "react-icons/md";
import { BiMaleFemale } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import Post from "@/components/Post";

export default function User() {
  const router = useRouter();
  const { id } = router.query;
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const postsRes = await fetch(
          `https://gorest.co.in/public/v2/users/${id}/posts`
        );
        const postsData = await postsRes.json();
        setPosts(postsData);

        const userRes = await fetch(
          `https://gorest.co.in/public/v2/users/${id}`
        );
        const userData = await userRes.json();
        setUser(userData);

        // const totalPages = parseInt(postsRes.headers.get("X-Pagination-Pages"));
        // setPageCount(totalPages);
        console.log(postsData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [posts]);

  return (
    <div className="flex flex-col h-full py-10  bg-dark md:px-16 lg:px-32 xl:px-80 min-h-screen space-y-5">
      <Navbar />
      <div className="w-full md:grid md:grid-cols-8 bg-dark-second/50 p-5 px-5 border-y border-dark-third md:rounded-md md:border items-center justify-center text-sm">
        <div className="md:col-span-4 xl:col-span-6 flex flex-col items-center md:items-start">
          <p className="text-2xl text-sky font-bold">{user.name}</p>
          <p className="text-light-second/60 italic md:text-lg">id: {id}</p>
        </div>

        <div className="md:col-span-4 xl:col-span-2 mt-4 mb-2 md:m-0 w-full ">
          <div className="flex items-center justify-between p-2 px-5 bg-light-second/10 rounded-md text-light ">
            <MdEmail className="scale-125" />
            <p>{user.email}</p>
          </div>
          <div className="grid grid-cols-2 w-full gap-2 mt-2">
            <div className="flex w-full items-center justify-between p-2 px-5 bg-light-second/10 rounded-md text-light ">
              <BiMaleFemale className="scale-125" />
              <p>{user.gender}</p>
            </div>
            <div className="flex w-full items-center justify-between p-2 px-5 bg-light-second/10 rounded-md text-light ">
              <FaCheckCircle className="scale-125" />
              <p>{user.status}</p>
            </div>
          </div>
        </div>
      </div>

      {posts.map((item) => (
        <Post post={item} />
      ))}
    </div>
  );
}
