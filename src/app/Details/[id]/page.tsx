"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import { ChevronRight, Star, Clock, Calendar } from "lucide-react";

interface Genre {
  id: number;
  name: string;
}

interface MovieType {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
  genres: Genre[];
}

const BEARER =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWEzMGNhOGU0YjkxMjUyOTc3Y2ZmYTY3MjA0YzcxYSIsIm5iZiI6MTc3OTI2NjY0OS41ODA5OTk5LCJzdWIiOiI2YTBkNzQ1OTAwYWE5OTc3NzMwYzBjZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._45evHDlOZguNWt82rgCjZmxqgTHpuXCQjvxXuYHpyY";

const Detail = () => {
  const params = useParams();
  const [movie, setMovie] = useState<MovieType>();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}`, {
        headers: { Authorization: BEARER },
      })
      .then((response) => {
        setMovie(response.data);
      });
  }, [params.id]);

  return (
    <div className="min-h-screen w-full bg-[#0d0d14] text-white overflow-x-hidden">
      {/* Fullscreen backdrop hero */}
      <div className="relative w-full h-screen">
        {movie?.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.original_title || "backdrop"}
            fill
            priority
            className="object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#0d0d14]" />
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d14]/70 via-transparent to-transparent" />

        {/* Navigation — floats on top of backdrop */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <Navigation />
        </div>

        {/* Movie info — pinned to bottom of the fullscreen hero */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-20 pb-10">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Poster */}
            {movie?.poster_path && (
              <div className="flex-shrink-0 hidden md:block">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title || "poster"}
                  width={180}
                  height={270}
                  className="rounded-xl shadow-2xl shadow-black/80 ring-1 ring-white/10 object-cover"
                />
              </div>
            )}

            {/* Info block */}
            <div className="flex flex-col gap-3 pb-2">
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight drop-shadow-lg">
                {movie?.original_title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-gray-400" />
                  {movie?.release_date?.slice(0, 4)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-gray-400" />
                  {movie?.runtime} mins
                </span>
                <span className="flex items-center gap-1.5 bg-yellow-400/15 text-yellow-300 px-2.5 py-0.5 rounded-full font-semibold text-xs">
                  <Star size={12} className="fill-yellow-300 text-yellow-300" />
                  {movie?.vote_average?.toFixed(1)}
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie?.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full border border-white/20 bg-white/10 text-gray-200 backdrop-blur-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <p className="text-gray-300 leading-relaxed max-w-2xl text-sm md:text-[15px] line-clamp-3">
                {movie?.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Below-the-fold content */}
      <div className="px-6 md:px-12 lg:px-20 pb-16 pt-12">
        {/* More Like This */}
        <div className="mt-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold tracking-tight">More Like This</h2>
            <button className="flex items-center gap-1 text-xs uppercase tracking-widest text-gray-500 hover:text-gray-200 transition-colors">
              See more <ChevronRight size={14} />
            </button>
          </div>

          {/* Placeholder cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/5 h-52 animate-pulse ring-1 ring-white/5"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
