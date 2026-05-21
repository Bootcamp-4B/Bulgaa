"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import MovieCard from "@/components/MovieCard";
import Navigation from "@/components/Navigation";
import FeaturedMovies from "@/components/FeaturedMovies";
import PopularMovieCard from "@/components/Popular";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import { log } from "console";
import { useState } from "react";
export default function Home() {
  const [movies, setMovies] = useState([]);

  axios
    .get("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWEzMGNhOGU0YjkxMjUyOTc3Y2ZmYTY3MjA0YzcxYSIsIm5iZiI6MTc3OTI2NjY0OS41ODA5OTk5LCJzdWIiOiI2YTBkNzQ1OTAwYWE5OTc3NzMwYzBjZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._45evHDlOZguNWt82rgCjZmxqgTHpuXCQjvxXuYHpyY",
      },
    })
    .then((responce) => {
      console.log("working....");
      console.log(responce);
      setMovies(responce.data.results);
    });

  return (
    <div className="w-full h-full overflow-x-hidden">
      <Navigation />
      <FeaturedMovies
        title="Wicked"
        rating={6.9}
        description="Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads. "
        imageUrl="/Feature.jpg"
      />
      {/* Upcoming Movies */}
      <div className="w-full h-full">
        <div className="flex justify-between items-center px-6 mt-10">
          <h2 className="text-2xl font-bold">Upcoming Movies</h2>
          <button className="text-xl flex items-center">
            See more <ChevronRight />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <div className="gap-8 flex flex-wrap mt-10 px-6 justify-center items-center">
            <MovieCard
              title="Dear Santa"
              imageUrl="/upcoming-img/card-image.png"
              rating={8.8}
            />
          </div>
        </div>
      </div>
      {/* Popular Movies */}
      <div>
        <div className="flex justify-between items-center px-6 mt-10"></div>
      </div>
    </div>
  );
}
