import React from "react";
import { FaCommentAlt } from "react-icons/fa";

export default function Card({ post }) {
  return (
    <div className="flex flex-col justify-between p-5 pb-0 bg-dark-second/50 text-light border-y border-dark-third text-sm text-justify md:rounded-md md:border md:h-min-48 hover:border-light/50 hover:shadow-lg hover:shadow-black/50">
      <div className="border-b border-dark-third">
        <div className="flex text-sm mb-2 space-x-2">
          <p className="text-light font-bold">{post.username}</p>
          <p className="text-light-second/50">id: {post.user_id}</p>
        </div>
        <p className="font-bold text-sky text-base mb-1">{post.title}</p>
        <p className="font-thin mb-4">{post.body}</p>
      </div>
      <div className="flex py-3 w-max text-slate-500 items-center space-x-2 hover:text-slate-300 font-semibold">
        <FaCommentAlt className="mt-[1px]" />
        <p>{post.comments.length}</p>
      </div>
    </div>
  );
}
