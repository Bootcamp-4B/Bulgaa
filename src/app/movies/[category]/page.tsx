"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "@/components/Navigation";
import MovieCard from "@/components/MovieCard";
import type { MovieType } from "@/app/page";
import { tmdbHeaders } from "@/lib/tmdb";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const apiCategory = category.replace("-", "_");
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${apiCategory}?language=en-US&page=${page}`,
        { headers: tmdbHeaders },
      )
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(Math.min(res.data.total_pages, 100));
      });
  }, [category, page]);

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Navigation />
      <div className="px-16 mt-12 pb-16">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
          {category.replace("-", " ")}
        </h2>

        <div className="grid grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-30"
          >
            Previous
          </button>

          <button
            onClick={() => setPage(1)}
            className={`w-10 h-10 rounded-lg text-sm font-semibold ${page === 1 ? "bg-white text-black" : "bg-zinc-800 text-white hover:bg-zinc-700"}`}
          >
            1
          </button>

          {page > 2 && <span className="text-zinc-500">...</span>}

          {page !== 1 && page !== totalPages && (
            <button className="w-10 h-10 rounded-lg text-sm font-semibold bg-white text-black">
              {page}
            </button>
          )}

          {page < totalPages - 1 && <span className="text-zinc-500">...</span>}

          {totalPages > 1 && (
            <button
              onClick={() => setPage(totalPages)}
              className={`w-10 h-10 rounded-lg text-sm font-semibold ${page === totalPages ? "bg-white text-black" : "bg-zinc-800 text-white hover:bg-zinc-700"}`}
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-30"
          >
            Next
          </button>
        </div>

        <p className="text-center text-zinc-500 text-sm mt-4">
          {page} / {totalPages}
        </p>
      </div>
    </div>
  );
}
