import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MdEmail } from "react-icons/md";

import { FaTrash, FaPen } from "react-icons/fa";
import Post from "@/components/Post";
import Link from "next/link";
import { toast } from "react-toastify";
import Dropdown from "@/components/Dropdown";

export default function UserDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [selectedGenderOption, setSelectedGenderOption] = useState("");
  const genderOptions = ["male", "female"];
  const [selectedStatusOption, setSelectedStatusOption] = useState("");
  const statusOptions = ["active", "inactive"];
  const [isEdit, setIsEdit] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const fetchData = async () => {
    try {
      const postsRes = await fetch(
        `https://gorest.co.in/public/v2/users/${id}/posts`
      );
      const postsData = await postsRes.json();
      setPosts(postsData);

      const userRes = await fetch(`https://gorest.co.in/public/v2/users/${id}`);
      const userData = await userRes.json();
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    if (isEdit === false) {
      setSelectedGenderOption(user.gender);
      setSelectedStatusOption(user.status);
      setEmail(user.email);
      setName(user.name || "Anonymous");
    }
  }, [isEdit, user]);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer 9aaaa51761922649a4643dd5f7455875fce108cd93085d3294cb2ab5ba3ad05c",
        },
      });
      if (res.ok) {
        toast.success("User deleted successfully");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  function handleUpdateUser() {
    const data = {
      name: name,
      email: email,
      status: selectedStatusOption,
      gender: selectedGenderOption,
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 9aaaa51761922649a4643dd5f7455875fce108cd93085d3294cb2ab5ba3ad05c`,
      },
      body: JSON.stringify(data),
    };

    try {
      fetch(`https://gorest.co.in/public/v2/users/${id}`, requestOptions)
        .then((response) => {
          if (response.ok) {
            toast.success("User updated successfully!");
            fetchData();
          }
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => {
          console.error(error);
          toast.error("Failed to update user");
        });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
    }
  }

  return (
    <div className="flex flex-col h-full py-5 bg-dark md:px-16 lg:px-32 xl:px-80 min-h-screen justify-between">
      <div className="space-y-5">
        <div className="md:flex md:gap-5">
          <div className="w-full md:grid md:grid-cols-10 bg-dark-second/50 p-5 px-5 border-y border-dark-third md:rounded-md md:border items-center justify-center text-sm">
            <div className="md:col-span-5 flex flex-col items-center md:items-start">
              <input
                type="text"
                value={name}
                className="w-full outline-none bg-transparent text-2xl text-sky font-bold text-center md:text-left"
                onChange={(e) => setName(e.target.value)}
                disabled={!isEdit}
              />
              <p className="text-light-second/60 italic md:text-lg">id: {id}</p>
            </div>

            <div className="md:col-span-5 mt-4 mb-2 md:m-0 w-full ">
              <div
                className={`flex items-center justify-between p-2 px-5 rounded-md text-light ${
                  isEdit ? "bg-light-second/20" : "bg-light-second/10"
                }`}
              >
                <MdEmail className="text-light scale-150 mr-2" />
                <input
                  type="text"
                  value={email}
                  className="w-full outline-none bg-transparent text-sm text-right text-light"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEdit}
                />
              </div>
              <div className="grid grid-cols-2 w-full gap-2 mt-2">
                <Dropdown
                  datas={genderOptions}
                  textValue={selectedGenderOption}
                  setTextValue={setSelectedGenderOption}
                  placeholder={user.gender}
                  disabled={!isEdit}
                  type="gender"
                />
                <Dropdown
                  datas={statusOptions}
                  textValue={selectedStatusOption}
                  setTextValue={setSelectedStatusOption}
                  placeholder={user.status}
                  disabled={!isEdit}
                  type="status"
                />
              </div>
            </div>
          </div>
          <div className="bg-dark-second/50 p-5 border-b border-dark-third md:rounded-md md:border items-center justify-center flex flex-col gap-3 text-sm">
            <button
              className={`cursor-default w-full inline-flex items-center justify-center rounded-full px-5 py-1 duration-300 ${
                isEdit
                  ? "bg-light/20 hover:bg-light-second/50 hover:black/50"
                  : "bg-gradient-to-r from-blue-600 to-sky hover:bg-light-second/30 hover:shadow-blue-600/40"
              } text-light hover:shadow-lg  hover:-translate-y-1`}
              onClick={() => setIsEdit(!isEdit)}
            >
              <FaPen
                className={`${isEdit ? "hidden" : "mr-3 scale-110 mb-[2px]"}`}
              />
              <p className="font-semibold  ">{isEdit ? "Cancel" : "Edit"}</p>
            </button>
            <button
              className={`${
                isEdit
                  ? "bg-gradient-to-r from-blue-600 to-sky cursor-default w-full inline-flex items-center justify-center rounded-full px-5 py-1 duration-300 hover:bg-light-second/30 text-light hover:shadow-lg hover:shadow-blue-600/40 hover:-translate-y-1"
                  : "hidden"
              }`}
              onClick={handleUpdateUser}
            >
              <FaPen className="mr-3 scale-110 mb-[2px]" />
              <p className="font-semibold  ">Submit</p>
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
        className="inline-flex pl-5 mb-5 md:p-0 w-full justify-center"
      >
        <p className="text-sm text-light-second/50 italic hover:text-light/50 cursor-pointer">
          Back to previous page
        </p>
      </Link>
    </div>
  );
}
