import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MdEmail } from "react-icons/md";
import { BiMaleFemale } from "react-icons/bi";
import { FaCheckCircle, FaTrash, FaPen } from "react-icons/fa";
import Post from "@/components/Post";
import Link from "next/link";
import { toast } from "react-toastify";

export default function UserDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [posts, user]);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `https://gorest.co.in/public/v2/users/${user.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer 9aaaa51761922649a4643dd5f7455875fce108cd93085d3294cb2ab5ba3ad05c",
          },
        }
      );
      if (res.ok) {
        toast.success("User deleted successfully");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col h-full py-5  bg-dark md:px-16 lg:px-32 xl:px-80 min-h-screen justify-between">
      <div className="space-y-5">
        <div className="md:flex md:gap-5">
          <div className="w-full md:grid md:grid-cols-10 bg-dark-second/50 p-5 px-5 border-y border-dark-third md:rounded-md md:border items-center justify-center text-sm">
            <div className="md:col-span-5 flex flex-col items-center md:items-start">
              <p className="text-2xl text-sky font-bold">
                {user.name || "Anonymous"}
              </p>
              <p className="text-light-second/60 italic md:text-lg">id: {id}</p>
            </div>

            <div className="md:col-span-5 mt-4 mb-2 md:m-0 w-full ">
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
          <div
            className={`${
              user.name
                ? "bg-dark-second/50 p-5 border-b border-dark-third md:rounded-md md:border items-center justify-center flex flex-col gap-3 text-sm"
                : "hidden"
            }`}
          >
            <button className="bg-gradient-to-r from-blue-600 to-sky cursor-default w-full inline-flex items-center justify-center rounded-full px-5 py-1 duration-300 hover:bg-light-second/30 text-light hover:shadow-lg hover:shadow-blue-600/40 hover:-translate-y-1">
              <FaPen className="mr-3 scale-110 mb-[2px]" />
              <p className="font-semibold  ">Edit</p>
            </button>
            <button
              className="bg-transparent text-light-second cursor-default w-full inline-flex items-center justify-center rounded-full px-5 py-1 border border-light-second/50 duration-300 hover:bg-light-second/30 hover:text-light hover:shadow-lg hover:shadow-black/50 hover:-translate-y-1"
              onClick={handleDeleteUser}
            >
              <FaTrash className="mr-3 scale-110 mb-[2px]" />
              <p className="font-semibold ">Delete</p>
            </button>
          </div>
        </div>

        {posts.map((item) => (
          <Post key={item.id} post={item} />
        ))}
      </div>

      <Link
        href={"/"}
        className="inline-flex pl-5 md:p-0 w-full justify-center"
      >
        <p className="text-sm text-light-second/50 italic hover:text-light/50 cursor-pointer">
          Back to previous page
        </p>
      </Link>
    </div>
  );
}
