import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
type FeaturedMoviesProps = {
  title: string;
  rating: number;
  description: string;
  imageUrl: string;
};
let FeaturedMovies = ({
  title,
  rating,
  description,
  imageUrl,
}: FeaturedMoviesProps) => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="ml-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-0">
            <div className="relative w-full h-[720px] overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={imageUrl}
                  alt="feature"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Text Content */}
              <div className="relative z-10 flex items-center h-full px-20">
                <div className="max-w-[450px] text-white">
                  <p className="text-2xl font-light mb-2">Now Playing:</p>
                  <h1 className="text-7xl font-bold mb-4">{title}</h1>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-yellow-400 text-3xl">★</span>
                    <span className="text-2xl font-semibold">{rating}/10</span>
                  </div>
                  <p className="text-lg leading-8 text-white/90 mb-8">
                    {description}
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
