import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import { title } from "process";
type PopularMovieCardProps = {
  title: "string";
  imageUrl: "string";
  rating: "number";
};

let PopularMovieCard = ({ title, imageUrl, rating }: PopularMovieCardProps) => {
  return (
    <Card className="w-[230]">
      <CardContent>
        <Image src={imageUrl} alt="card-image" width={230} height={340} />
        <p className="flex items-center gap-1">
          <Star fill="yellow" stroke="yellow"></Star>
          <span className="ml-1 text-sm font-medium">{rating}</span>
          /10
        </p>
        <p className="font-bold">{title}</p>
      </CardContent>
    </Card>
  );
};

export default PopularMovieCard;
