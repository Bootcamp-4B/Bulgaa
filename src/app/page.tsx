import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import MovieCard from "@/components/MovieCard";
import { Fullscreen } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Carousel className="w-full ">
        <CarouselContent className="m-0">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="bg-[url('/Feature.jpg')] bg-cover bg-center w-full h-[720px]"></div>
              <div className="p-1"> </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex justify-center items-center">
        <div className="w-[1500px] gap-8 flex flex-wrap mt-10 px-6 justify-center items-center ">
          <MovieCard
            title="Dear Santa"
            imageUrl="/card-image.png"
            rating={8.8}
          />
          <MovieCard
            title="Dear Santa"
            imageUrl="@/upcoming-img/dragon.png"
            rating={8.8}
          />
          <MovieCard
            title="Dear Santa"
            imageUrl="/card-image.png"
            rating={8.8}
          />
          <MovieCard
            title="Dear Santa"
            imageUrl="/card-image.png"
            rating={8.8}
          />
          <MovieCard
            title="Dear Santa"
            imageUrl="/card-image.png"
            rating={8.8}
          />
          <MovieCard
            title="Dear Santa"
            imageUrl="/card-image.png"
            rating={8.8}
          />
          <MovieCard
            title="Dear Santa"
            imageUrl="/card-image.png"
            rating={8.8}
          />
          <MovieCard
            title="Dear Santa"
            imageUrl="/card-image.png"
            rating={8.8}
          />
          <MovieCard
            title="Dear Santa"
            imageUrl="/card-image.png"
            rating={8.8}
          />
          <MovieCard
            title="Dear Santa"
            imageUrl="/card-image.png"
            rating={8.8}
          />
        </div>
      </div>
    </div>
  );
}
