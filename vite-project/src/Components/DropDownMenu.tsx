import React, { useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
const DropDownMenu = () => {
  let Options = [
    {
      option: "First",
      value: 1,
    },
    {
      option: "Second",
      value: 2,
    },
    {
      option: "Third",
      value: 3,
    },
    {
      option: "Fourth",
      value: 4,
    },
    {
      option: "Fifth",
      value: 5,
    },
  ];
  let [isShow, setIsShow] = useState<boolean>(false);
  return (
    <div className="m-16">
      <div
        className={`w-[25rem] h-[3rem] flex items-center justify-between
     border-[1px]  px-4 rounded-md cursor-pointer ${
       isShow ? "border-blue-500" : "border-gray-500"
     }`}
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        <span className="text-xl ">First</span>
        <div className="flex items-center justify-between gap-2">
          <CiSquareRemove className="text-xl hover:fill-red-500 duration-200" />
          <span className="border-r-[1px] border-gray-500 h-6"></span>
          <IoMdArrowDropdown className="text-xl" />
        </div>
      </div>
      <div className={isShow ? "block" : "hidden"}>
        <ul
          className="w-[25rem] h-[auto]
        rounded-lg border-[1px] border-gray-500 mt-1 overflow-hidden"
        >
          {Options.map((option) => (
            <li className="py-2 pl-4 hover:bg-blue-500 hover:text-white">
              {option.option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDownMenu;
