import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import { title } from "process";

interface MovieCardProps {
  title: string;
  imageUrl: string;
  rating: number;
}
// let MovieCard = ({ title, imageUrl, rating }: MovieCardProps) => {
//   return (
//     <Card className="w-62.5 h-120 border-none px-0 py-0 bg-[#F4F4F5]">
//       <CardContent>
//         <Image src={imageUrl} alt="card-image" width={250} height={340} />
//         <p className="flex items-center gap-1">
//           <Star fill="yellow" stroke="yellow"></Star>
//           <span className="ml-1 text-sm font-medium">{rating}</span>
//           /10
//         </p>
//         <p className="font-bold">{title}</p>
//       </CardContent>
//     </Card>
//   );
// };
const MovieCard = (props: MovieCardProps) => {
  return (
    <Card className="w-[250px] h-[480px] border-none px-0 py-0 bg-[#F4F4F5]">
      <CardContent className="px-0 py-0">
        <Image src={props.imageUrl} alt="card-image" width={250} height={340} />
        <div className="mt-2 p-[8]">
          <p className="flex items-center gap-1">
            <Star fill="yellow" stroke="yellow"></Star>
            <span className="ml-1 text-sm font-medium">{props.rating}</span>
            /10
          </p>
          <p className="font-bold text-lg">{props.title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
