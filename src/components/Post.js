import { useState, useEffect, useRef } from "react";
import { FaCommentAlt } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import Link from "next/link";

export default function Card({ post }) {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toogleComment, setToogleComment] = useState(false);
  const commentRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const commentRes = await fetch(
          `https://gorest.co.in/public/v2/posts/${post.id}/comments`
        );
        const commentData = await commentRes.json();

        const userRes = await fetch(
          `https://gorest.co.in/public/v2/users/${post.user_id}`
        );
        const userData = await userRes.json();

        setUsers(userData);
        setComments(commentData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [post]);

  useEffect(() => {
    if (isOpen) {
      document.getElementById(`comment-input-${post.id}`).focus();
    }
  }, [isOpen]);

  const handleOutsideClick = (e) => {
    if (commentRef.current && !commentRef.current.contains(e.target)) {
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
    <div className="flex flex-col justify-between p-5 pb-0 bg-dark-second/50 text-light border-y border-dark-third text-sm text-justify md:rounded-md md:border md:h-min-48">
      <div className="border-b border-dark-third">
        <div className="flex text-sm mb-2 space-x-2">
          <Link href={`/user/${post.user_id}`}>
            <p className="text-light/80 font-bold hover:text-light cursor-pointer">
              {users.name || "Anonymous"}
            </p>
          </Link>
          <p className="text-light-second/50">id: {post.user_id}</p>
        </div>
        <p className="font-bold text-sky text-base mb-1">{post.title}</p>
        <p className="font-thin mb-4">{post.body}</p>
      </div>
      <div className="flex flex-col py-3">
        <div
          className="flex items-center w-max text-slate-400  space-x-2 hover:text-slate-300 font-semibold cursor-pointer"
          onClick={() => setToogleComment(!toogleComment)}
        >
          <FaCommentAlt className="mt-[1px]" />
          <p>{comments != null ? comments.length : 0} comments</p>
        </div>

        <div className={`${toogleComment ? "" : "hidden"}`}>
          {comments &&
            comments.map((comment) => (
              <div
                key={comment.id}
                className="mt-3 p-2 bg-light-second/10 rounded-md"
              >
                <p className="font-bold text-sky">
                  {comment.name || "Anonymous"}
                </p>
                <p>{comment.body}</p>
              </div>
            ))}

          <div
            className={`flex items-center px-2 py-3 w-full border rounded-md transition duration-500 bg-light-second/10 mt-3 ${
              isOpen ? "border-sky bg-dark-third/50" : "border-transparent"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            ref={commentRef}
          >
            <input
              id={`comment-input-${post.id}`}
              type="text"
              placeholder="Write your comment here..."
              className={`w-full outline-none bg-transparent text-sm ${
                isOpen ? "text-light" : "text-light-second"
              }`}
            />
            <BsFillSendFill
              className={`text-light-second ml-2 mr-1 ${
                isOpen ? "hover:text-light cursor-pointer " : "hidden"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
