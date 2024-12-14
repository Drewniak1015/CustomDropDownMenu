import React, { useEffect, useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
const DropDownMenu = () => {
  let Options = [
    {
      option: "First",
      value: 0,
    },
    {
      option: "Second",
      value: 1,
    },
    {
      option: "Third",
      value: 2,
    },
    {
      option: "Fourth",
      value: 3,
    },
    {
      option: "Fifth",
      value: 4,
    },
  ];
  let [isShow, setIsShow] = useState<boolean>(false);
  let [option, setOption] = useState<string>("First");
  let [hover, setHover] = useState<number>();

  function FilterOption() {
    if (Options.map((opt) => opt.option == option)) {
      return option;
    }
  }

  function FIlterHover() {
    if (Options.map((opt) => opt.value == hover)) {
      return hover;
    }
  }

  useEffect(() => {
    const KeyboardEvent = (e: KeyboardEvent) => {
      if (hover !== undefined) {
        if (e.key == "ArrowUp" && hover > 0) {
          setHover(hover - 1);
        } else if (e.key == "ArrowDown" && hover <= Options.length - 2) {
          setHover(hover + 1);
        } else return;
      }
    };
    document.addEventListener("keydown", KeyboardEvent);

    return () => {
      document.removeEventListener("keydown", KeyboardEvent);
    };
  }, [hover]);

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
        <span className="text-xl ">{option}</span>
        <div className="flex items-center justify-between gap-2">
          <CiSquareRemove
            className="text-xl hover:fill-red-500 duration-200 z-50"
            onClick={(e) => {
              e.stopPropagation();
              setOption("");
              setIsShow(false);
            }}
          />
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
            <li
              className={`py-2 pl-4  ${
                FilterOption() == option.option ? "bg-blue-400" : ""
              } ${
                FIlterHover() == option.value ? "bg-blue-500 text-white" : ""
              }`}
              key={option.value}
              onClick={() => {
                setOption(option.option);
                setIsShow(!isShow);
              }}
              onMouseEnter={() => {
                setHover(option.value);
              }}
            >
              {option.option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDownMenu;
