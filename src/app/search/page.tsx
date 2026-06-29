"use client";

import axios from "axios";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Navigation from "@/components/Navigation";
import MovieCard from "@/components/MovieCard";
import { Footer } from "@/components/Footer";
import { tmdbHeaders } from "@/lib/tmdb";

const SearchContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    if (!query) return;

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
        { headers: tmdbHeaders },
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  return (
    <div className="flex justify-center">
      <div className="w-[1280px] px-10 py-10">
        <h1 className="text-2xl font-bold mb-6">Search Results : {query}</h1>
        <div className="flex flex-wrap gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SearchPage = () => {
  return (
    <div>
      <Navigation />
      <Suspense
        fallback={
          <div className="flex justify-center py-20 text-white">Loading...</div>
        }
      >
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  );
};

export default SearchPage;
