import { Star } from "lucide-react";
import { useState } from "react";
export const RatingStars = ({
  rating,
  onRatingChange,
}: {
  rating: number;
  onRatingChange?: (rating: number) => void;
}) => {
  const [hover, setHover] = useState(0);
  const isInteractive = !!onRatingChange;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < (hover || Math.floor(rating))
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          } ${isInteractive ? "cursor-pointer" : ""}`}
          onMouseEnter={() => isInteractive && setHover(i + 1)}
          onMouseLeave={() => isInteractive && setHover(0)}
          onClick={() => isInteractive && onRatingChange(i + 1)}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};
