"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();

  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    if (!value.trim()) return;

    router.push(`/search?search=${value}`);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search movie..."
        className="border rounded-md px-3 py-2"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </div>
  );
}
