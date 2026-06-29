"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SearchBar from "./Searchbar";

import { ChevronDown } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { tmdbHeaders } from "@/lib/tmdb";

type GenreType = {
  id: number;
  name: string;
};

export default function Navigation() {
  const router = useRouter();

  const [genres, setGenres] = useState<GenreType[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list?language=en-US", {
        headers: tmdbHeaders,
      })
      .then((response) => {
        setGenres(response.data.genres);
      });
  }, []);

  const chooseGenre = (genre: GenreType) => {
    setOpen(false);

    router.push(`/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`);
  };

  return (
    <div className="w-full h-[70px] bg-zinc-100 dark:bg-zinc-950 text-black dark:text-white flex justify-between items-center px-4 relative border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-2">
        <Image src="/film.svg" alt="logo" width={32} height={32} />

        <Link
          href="/"
          className="text-indigo-700 dark:text-indigo-400 font-bold italic"
        >
          WoLo cinema
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 border border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-2 bg-white dark:bg-zinc-900 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ChevronDown size={16} />
            Genres
          </button>

          {open && (
            <div className="absolute top-12 left-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-md w-[220px] z-50 max-h-[400px] overflow-y-auto">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => chooseGenre(genre)}
                  className="w-full text-left px-4 py-2 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {genre.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <SearchBar />
      </div>

      <AnimatedThemeToggler variant="rectangle" />
    </div>
  );
}
