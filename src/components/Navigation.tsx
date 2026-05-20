import Image from "next/image";
import { ChevronDown, Moon, Search } from "lucide-react";
let Navigation = () => {
  return (
    <div className="w-full h-17.5 bg-[#F4F4F5] flex justify-between items-center px-4">
      <div className="flex items-center gap-2">
        <Image src="/film.svg" alt="logo" width={32} height={32} />
        <h1 className="text-indigo-700 font-inter text-base italic font-bold leading-5 tracking-wide">
          Movie Z
        </h1>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1">
          <ChevronDown />
          Genre
        </button>
        <div className="flex items-center border border-gray-300 rounded-md min-w-[380]">
          <Search className="" />
          <input
            className=" rounded-md min-w-[380] focus:outline-none focus:border-transparent [&::-webkit-search-cancel-button]:appearance-none"
            type="search"
            placeholder="Search movies..."
          />
        </div>
      </div>
      <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1">
        <Moon />
      </button>
    </div>
  );
};

export default Navigation;
