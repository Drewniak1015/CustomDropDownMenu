import { useEffect, useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

const DropdownMenu = () => {
  const options = [
    { label: "First", value: 0 },
    { label: "Second", value: 1 },
    { label: "Third", value: 2 },
    { label: "Fourth", value: 3 },
    { label: "Fifth", value: 4 },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMultiSelectOpen, setIsMultiSelectOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number>();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (hoverIndex !== undefined) {
      if (e.key === "ArrowUp" && hoverIndex > 0) {
        setHoverIndex(hoverIndex - 1);
      } else if (e.key === "ArrowDown" && hoverIndex < options.length - 1) {
        setHoverIndex(hoverIndex + 1);
      } else if (e.key === "Enter") {
        if (isDropdownOpen) {
          setSelectedOption(options[hoverIndex].label);
          setIsDropdownOpen(false);
        }
        if (isMultiSelectOpen) {
          const selected = options[hoverIndex].label;
          if (!selectedOptions.includes(selected)) {
            setSelectedOptions((prev) => [...prev, selected]);
          } else {
            setSelectedOptions((prev) =>
              prev.filter((option) => option !== selected)
            );
          }
          setIsMultiSelectOpen(false);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hoverIndex, isDropdownOpen, isMultiSelectOpen, selectedOptions]);

  return (
    <div className="m-8 flex gap-4 flex-wrap">
      <div className="flex flex-col">
        <div
          className={`w-[18rem] sm:w-[25rem] h-[3.75rem] flex items-center justify-between
           border-[1px] px-4 rounded-md cursor-pointer ${
             isDropdownOpen ? "border-blue-500" : "border-gray-500"
           }`}
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
            setIsMultiSelectOpen(false);
          }}
        >
          <span className="text-xl">{selectedOption}</span>
          <div className="flex items-center justify-between gap-2">
            <CiSquareRemove
              className="text-xl hover:fill-red-500 duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOption("");
                setIsDropdownOpen(false);
              }}
            />
            <span className="border-r-[1px] border-gray-500 h-7"></span>
            <IoMdArrowDropdown className="text-xl" />
          </div>
        </div>
        <div className={isDropdownOpen ? "block" : "hidden"}>
          <ul className="w-[18rem] sm:w-[25rem] mt-1 rounded-lg border-[1px] border-gray-500 overflow-hidden">
            {options.map((option) => (
              <li
                className={`py-2 pl-4 ${
                  selectedOption === option.label ? "bg-blue-400" : ""
                } ${
                  hoverIndex === option.value ? "bg-blue-500 text-white" : ""
                }`}
                key={option.value}
                onClick={() => {
                  setSelectedOption(option.label);
                  setIsDropdownOpen(false);
                }}
                onMouseEnter={() => {
                  setHoverIndex(option.value);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col">
        <div
          className={`w-[18rem] sm:w-[25rem] h-[auto] min-h-[3.75rem] py-4 flex items-center justify-between
           border-[1px] px-4 rounded-md cursor-pointer flex-wrap ${
             isMultiSelectOpen ? "border-blue-500" : "border-gray-500"
           }`}
          onClick={() => {
            setIsMultiSelectOpen(!isMultiSelectOpen);
            setIsDropdownOpen(false);
          }}
        >
          <span className="w-[75%] flex gap-2 flex-wrap">
            {selectedOptions.map((opt) => (
              <button
                className="border-[1px] rounded-sm border-black px-2 flex items-center hover:bg-red-200 group"
                key={opt}
                onClick={() => {
                  setSelectedOptions((prev) =>
                    prev.filter((option) => option !== opt)
                  );
                }}
              >
                <p>{opt}</p>
                <FaDeleteLeft className="ml-[4px] group-hover:fill-red-400" />
              </button>
            ))}
          </span>
          <div className="flex items-center justify-between gap-2">
            <CiSquareRemove
              className="text-xl hover:fill-red-500 duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOptions([]);
                setIsMultiSelectOpen(false);
              }}
            />
            <span className="border-r-[1px] border-gray-500 h-[100%]"></span>
            <IoMdArrowDropdown className="text-xl" />
          </div>
        </div>
        <div className={isMultiSelectOpen ? "block" : "hidden"}>
          <ul className="w-[18rem] sm:w-[25rem] mt-1 rounded-lg border-[1px] border-gray-500 overflow-hidden">
            {options.map((option) => (
              <li
                className={`py-2 pl-4 ${
                  selectedOption === option.label ? "bg-blue-400" : ""
                } ${
                  hoverIndex === option.value ? "bg-blue-500 text-white" : ""
                } ${
                  selectedOptions.includes(option.label)
                    ? "bg-blue-300 text-black"
                    : ""
                }`}
                key={option.value}
                onClick={() => {
                  if (!selectedOptions.includes(option.label)) {
                    setSelectedOptions((prev) => [...prev, option.label]);
                  } else {
                    setSelectedOptions((prev) =>
                      prev.filter((opt) => opt !== option.label)
                    );
                  }
                  setIsMultiSelectOpen(false);
                }}
                onMouseEnter={() => {
                  setHoverIndex(option.value);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
// bardziej skalowalne ale na aktualne potrzeby wystarczy
// zrobić lepiej ten projekt w przyszłości
