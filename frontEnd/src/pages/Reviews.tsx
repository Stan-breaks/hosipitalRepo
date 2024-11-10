import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RatingStars } from "@/components/RatingStars";
import { User, ThumbsUp, Calendar } from "lucide-react";
import { ReviewType, StatsType } from "../types";

// Mock review data
const mockReviews: ReviewType[] = [
  {
    id: "1",
    hospitalId: "1",
    rating: 5,
    comment:
      "Dr. Wanjiku was very professional and thorough in her examination. She took time to explain everything clearly.",
    userName: "Jane Muthoni",
    date: "2024-11-08",
    helpful: 12,
  },
  {
    id: "2",
    hospitalId: "1",
    rating: 4,
    comment:
      "Great experience overall. The wait time was a bit long but the care was excellent.",
    userName: "David Odhiambo",
    date: "2024-11-07",
    helpful: 8,
  },
];

const ReviewCard = (review: ReviewType) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpfulClick = () => {
    if (!hasVoted) {
      setHelpfulCount((prev) => prev + 1);
      setHasVoted(true);
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="font-medium">{review.userName}</span>
            </div>
            <RatingStars rating={review.rating} />
            <p className="text-gray-700">{review.comment}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {review.date}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHelpfulClick}
                disabled={hasVoted}
                className="flex items-center space-x-1"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{helpfulCount} helpful</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const WriteReview = ({
  onSubmit,
}: {
  onSubmit: (reviewData: { rating: number; comment: string }) => void;
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="font-medium">Your Rating</label>
          <RatingStars rating={rating} onRatingChange={setRating} />
        </div>
        <div className="space-y-2">
          <label className="font-medium">Your Review</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className="h-24"
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full"
        >
          Submit Review
        </Button>
      </CardContent>
    </Card>
  );
};

export const Reviews: React.FC<{
  entityId: string;
}> = () => {
  const [reviews, setReviews] = useState<ReviewType[]>(mockReviews);
  const [sortBy, setSortBy] = useState("recent");

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "helpful") {
      return b.helpful - a.helpful;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const handleNewReview = (reviewData: { rating: number; comment: string }) => {
    const newReview = {
      id: String(reviews.length + 1),
      hospitalId: "hospital",
      rating: reviewData.rating,
      comment: reviewData.comment,
      userName: "Anonymous User", // In a real app, this would come from auth
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    };
    setReviews([newReview, ...reviews]);
  };

  const stats: StatsType = {
    average: reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length,
    total: reviews.length,
    distribution: {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    },
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                {stats.average.toFixed(1)}
              </h3>
              <RatingStars rating={stats.average} />
              <p className="text-gray-600 mt-2">{stats.total} reviews</p>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars: number) => (
                <div key={stars} className="flex items-center space-x-2">
                  <span className="w-4">{stars}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{
                        width: `${(stats.distribution[stars] / stats.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="w-10 text-sm text-gray-600">
                    {stats.distribution[stars]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <WriteReview onSubmit={handleNewReview} />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded p-2"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <ReviewCard {...review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
