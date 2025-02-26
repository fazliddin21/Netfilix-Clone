"use client"

import type React from "react"
import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  totalStars?: number
  initialRating?: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
}

export const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  initialRating = 0,
  onRatingChange,
  readonly = false,
}) => {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  const handleClick = (index: number) => {
    if (!readonly) {
      setRating(index)
      if (onRatingChange) {
        onRatingChange(index)
      }
    }
  }

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1
        return (
          <Star
            key={index}
            className={`h-6 w-6 ${
              starValue <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            } ${!readonly && "cursor-pointer"}`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => !readonly && setHover(starValue)}
            onMouseLeave={() => !readonly && setHover(rating)}
          />
        )
      })}
    </div>
  )
}

