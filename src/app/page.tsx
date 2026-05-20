import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import MovieCard from "@/components/MovieCard";
import Navigation from "@/components/Navigation";
import FeaturedMovies from "@/components/FeaturedMovies";
import PopularMovieCard from "@/components/Popular";
import { ChevronRight } from "lucide-react";

export default function Home() {
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
              imageUrl="/card-image.png"
              rating={8.8}
            />
            <MovieCard
              title="How To Train Your Dragon Live Action"
              imageUrl="/upcoming-img/dragon.png"
              rating={8.8}
            />

            <MovieCard
              title="Alien Romulus"
              imageUrl="/upcoming-img/alien.png"
              rating={8.8}
            />

            <MovieCard
              title="From the Ashes"
              imageUrl="/upcoming-img/ashes.png"
              rating={8.8}
            />

            <MovieCard
              title="Space Dogg"
              imageUrl="/upcoming-img/space-dogg.png"
              rating={8.8}
            />

            <MovieCard
              title="The Order"
              imageUrl="/upcoming-img/order.png"
              rating={8.8}
            />

            <MovieCard
              title="Y2K"
              imageUrl="/upcoming-img/y2k.png"
              rating={8.8}
            />

            <MovieCard
              title="Solo Leveling: ReAwakening"
              imageUrl="/upcoming-img/Solo-Leveling-ReAwakening.png"
              rating={8.8}
            />

            <MovieCard
              title="Get Away"
              imageUrl="/upcoming-img/getaway.jpg"
              rating={8.8}
            />

            <MovieCard
              title="Sonic the Hedgehog 3"
              imageUrl="/upcoming-img/sonic.png"
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
