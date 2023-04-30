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
  const [user, setUser] = useState({});
  const [selectedGenderOption, setSelectedGenderOption] = useState("");
  const genderOptions = ["male", "female"];
  const [selectedStatusOption, setSelectedStatusOption] = useState("");
  const statusOptions = ["active", "inactive"];
  const [isEdit, setIsEdit] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function handleCreateUser() {
    const data = {
      name: name,
      email: email,
      status: selectedStatusOption,
      gender: selectedGenderOption,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 9aaaa51761922649a4643dd5f7455875fce108cd93085d3294cb2ab5ba3ad05c`,
      },
      body: JSON.stringify(data),
    };

    try {
      fetch(`https://gorest.co.in/public/v2/users`, requestOptions)
        .then((response) => {
          if (response.ok) {
            toast.success("User created successfully!");
            return response.json();
          } else {
            throw new Error("Failed to create user");
          }
        })
        .then((data) => {
          console.log(data);
          setUser(data);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to create user");
        });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create user");
    }
  }

  return (
    <div className="flex flex-col h-full py-20  bg-dark md:px-16 lg:px-32 xl:px-80 min-h-screen justify-between">
      <div className="flex justify-center w-full text-center text-2xl font-bold text-light">
        Create User
      </div>
      <div className="space-y-5 md:px-40">
        <div className="flex flex-col md:gap-5">
          <div className="w-full bg-dark-second/50 p-5 px-5 border-y border-dark-third md:rounded-md md:border items-center justify-center text-sm ">
            <div className="flex flex-col items-center mb-5 space-y-2">
              <input
                type="text"
                value={name}
                className="w-full outline-none text-lg bg-light-second/20 px-5 py-1 text-sky font-bold text-center rounded-md"
                onChange={(e) => setName(e.target.value)}
                disabled={!isEdit}
                placeholder="Enter username..."
              />
              <p className="text-light-second/60 italic md:text-lg">
                id: {user.id}
              </p>
            </div>

            <div className="md:col-span-5 mt-4 mb-2 md:m-0 w-full space-y-5">
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
                  placeholder="Enter user's email"
                />
              </div>

              <Dropdown
                datas={genderOptions}
                textValue={selectedGenderOption}
                setTextValue={setSelectedGenderOption}
                placeholder={"Choose user's gender"}
                disabled={!isEdit}
                type="gender"
              />
              <Dropdown
                datas={statusOptions}
                textValue={selectedStatusOption}
                setTextValue={setSelectedStatusOption}
                placeholder={"Choose user's status"}
                disabled={!isEdit}
                type="status"
              />
            </div>
          </div>
          <div className="bg-dark-second/50 p-5 border-b border-dark-third md:rounded-md md:border items-center justify-center flex flex-col gap-3 text-sm">
            <button
              className={`${
                isEdit
                  ? "bg-gradient-to-r from-blue-600 to-sky cursor-default w-full inline-flex items-center justify-center rounded-full px-5 py-1 duration-300 hover:bg-light-second/30 text-light hover:shadow-lg hover:shadow-blue-600/40 hover:-translate-y-1"
                  : "hidden"
              }`}
              onClick={handleCreateUser}
            >
              <FaPen className="mr-3 scale-110 mb-[2px]" />
              <p className="font-semibold  ">Submit</p>
            </button>
          </div>
        </div>
      </div>

      <Link
        href={"/user"}
        className="inline-flex pl-5 md:p-0 w-full justify-center"
      >
        <p className="text-sm text-light-second/50 italic hover:text-light/50 cursor-pointer">
          Back to previous page
        </p>
      </Link>
    </div>
  );
}
