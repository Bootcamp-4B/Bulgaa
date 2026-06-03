"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import type { MovieType } from "@/app/page";

interface MovieCardProps {
  movie: MovieType;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link href={`/details/${movie.id}`}>
      <Card className="border-none px-0 py-0 bg-[#F4F4F5] dark:bg-[#1c1c27] hover:shadow-md transition-shadow">
        <CardContent className="px-0 py-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            width={250}
            height={340}
            className="w-full rounded-t-md object-cover"
          />
          <div className="mt-2 p-2">
            <p className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Star fill="yellow" stroke="yellow" size={16} />
              <span className="ml-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                {movie.vote_average.toFixed(1)}
              </span>
              /10
            </p>
            <p className="font-bold text-lg truncate text-gray-900 dark:text-white">
              {movie.title}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
