import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Play, Star, Stars } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

type FeaturedMovie = {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
};

const FeaturedMovies = () => {
  const [featuredMovies, setFeaturedMovies] = useState<FeaturedMovie[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWEzMGNhOGU0YjkxMjUyOTc3Y2ZmYTY3MjA0YzcxYSIsIm5iZiI6MTc3OTI2NjY0OS41ODA5OTk5LCJzdWIiOiI2YTBkNzQ1OTAwYWE5OTc3NzMwYzBjZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._45evHDlOZguNWt82rgCjZmxqgTHpuXCQjvxXuYHpyY",
          },
        },
      )
      .then((response) => {
        setFeaturedMovies(response.data.results);
      });
  }, []);

  return (
    <Carousel className="w-full">
      <CarouselContent className="ml-0">
        {featuredMovies.map((movie) => (
          <CarouselItem key={movie.id} className="pl-0">
            <div className="relative w-full h-[720px] overflow-hidden">
              {/* Background Image */}
              <div
                className="absolute inset-0 w-full h-screen min-h-[700px] bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: movie.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                    : undefined,
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Text Content */}
              <div className="relative z-10 flex items-center h-full px-20">
                <div className="max-w-[450px] text-white">
                  <p className="text-2xl font-light mb-2">Now Playing:</p>
                  <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
                  <div className="flex items-center gap-2 mb-6">
                    <Star className="text-yellow-400 text-3xl" />
                    <span className="text-2xl font-semibold">
                      {movie.vote_average.toFixed(1)}/10
                    </span>
                  </div>
                  <p className="text-lg leading-8 text-white/90 mb-8">
                    {movie.overview}
                  </p>
                  <Button className="bg-white text-black hover:bg-gray-200 px-6 py-6 text-lg">
                    <Play />
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-6 z-20" />
      <CarouselNext className="right-6 z-20" />
    </Carousel>
  );
};

export default FeaturedMovies;
