import { useState } from "react";
import { BiChevronDown, BiMaleFemale } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";

const Dropdown = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`w-full relative focus:outline-none rounded-md ${
        props.disabled
          ? "pointer-events-none"
          : "cursor-pointer bg-light-second/20"
      }`}
    >
      <div
        onClick={() => setOpen(!open)}
        className={`bg-dark-third/50 w-full text-light p-2 px-5 flex items-center justify-between rounded-md ${
          !props.textValue && ""
        }`}
      >
        <BiMaleFemale
          className={`${props.type === "gender" ? "scale-125" : "hidden"}`}
        />
        <FaCheckCircle
          className={`${props.type === "status" ? "scale-125" : "hidden"}`}
        />
        <div className="flex">
          {props.textValue ? props.textValue : props.placeholder}
          <BiChevronDown
            size={20}
            className={`${open && "rotate-180"} ${
              props.disabled ? "hidden" : ""
            } ml-3`}
          />
        </div>
      </div>
      <ul
        className={`bg-white text-black mt-2 overflow-y-auto absolute z-10 shadow-lg shadow-slate-500/20 rounded-md w-full ${
          open
            ? "max-h-60 outline outline-offset-0 outline-1 outline-white"
            : "max-h-0"
        } `}
      >
        {props.datas?.map((data, index) => (
          <li
            key={index}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
          ${data === props.textValue && "bg-sky-600 text-white"}`}
            onClick={() => {
              if (data !== props.textValue) {
                props.setTextValue(data);
                setOpen(false);
              }
            }}
          >
            {data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
