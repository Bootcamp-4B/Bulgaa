"use client";
import Navigation from "@/components/Navigation";
import FeaturedMovies from "@/components/FeaturedMovies";
import MovieCard from "@/components/MovieCard";
import { ChevronRight, Link } from "lucide-react";
import PopularMovies from "@/components/PopularMovies";
import TopRatedMovies from "@/components/TopRatedMovies";
import GroupMovie

export default function Home() {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <Navigation />
      <FeaturedMovies />

      {/* Upcoming Movies */}
      <div className="w-full px-16 mt-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-1">
              What's next
            </p>
            <h2 className="text-4xl font-black uppercase tracking-tight">
              Upcoming Movies
            </h2>
          </div>

          <a
            className="flex items-center gap-1 text-sm uppercase tracking-widest text-gray-400 hover:text-gray-300 transition-colors"
            href="/Upcoming
          "
          >
            See more
            <ChevronRight size={16} />
          </a>
        </div>
        <GroupMovie title="upcoming" />
        <GroupMovie></GroupMovie>
      </div>
    </div>
  );
}
