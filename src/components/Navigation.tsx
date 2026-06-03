import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import Link from "next/link";

let Navigation = () => {
  return (
    <div className="w-full h-17.5 bg-[#F4F4F5] dark:bg-[#0d0d14] flex justify-between items-center px-4 transition-colors duration-300">
      <div className="flex items-center gap-2">
        <Image src="/film.svg" alt="logo" width={32} height={32} />
        <Link
          className="text-indigo-700 dark:text-indigo-400 font-inter text-base italic font-bold leading-5 tracking-wide"
          href={"/"}
        >
          Movie Z
        </Link>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-md px-3 py-1 transition-colors duration-300">
          <ChevronDown />
          Genres
        </button>

        <input
          type="text"
          placeholder="Search movies..."
          className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
        />
      </div>
      <AnimatedThemeToggler
        className=" p-2 rounded-md transition-colors duration-300§"
        variant="rectangle"
      />
    </div>
  );
};

export default Navigation;
