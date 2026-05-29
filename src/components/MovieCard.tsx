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
      <Card className="border-none px-0 py-0 bg-[#F4F4F5] hover:shadow-md transition-shadow">
        <CardContent className="px-0 py-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            width={250}
            height={340}
            className="w-full rounded-t-md object-cover"
          />
          <div className="mt-2 p-2">
            <p className="flex items-center gap-1">
              <Star fill="yellow" stroke="yellow" size={16} />
              <span className="ml-1 text-sm font-medium">
                {movie.vote_average.toFixed(1)}
              </span>
              /10
            </p>
            <p className="font-bold text-lg truncate">{movie.title}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
