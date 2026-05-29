"use client";
import MovieCard from "./MovieCard";
import type { MovieType } from "@/app/page";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface GroupMovieProps {
  title: string;
  movies: MovieType[];
  href: string;
}

const GroupMovie = ({ title, movies, href }: GroupMovieProps) => {
  return (
    <div className="w-full mb-14">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black uppercase tracking-tight">
          {title}
        </h2>
        <Link
          href={href}
          className="flex items-center gap-1 text-sm uppercase tracking-widest text-gray-400 hover:text-gray-200 transition-colors"
        >
          See more <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {movies.slice(0, 10).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default GroupMovie;
