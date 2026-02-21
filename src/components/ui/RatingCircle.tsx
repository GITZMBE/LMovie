"use client";

import { twMerge } from "tailwind-merge";

type RatingCircleProps = {
  rating: number; // 0–10
  className?: string;
};

export const RatingCircle = ({ rating, className }: RatingCircleProps) => {
  const percentage = rating / 10;
  const radius = 16;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - percentage * circumference;

  // 🎨 Determine color based on rating
  let strokeColor = "var(--color-red)"; // red (default < 5)

  if (rating >= 7.5) {
    strokeColor = "var(--color-green)"; // green
  } else if (rating >= 5) {
    strokeColor = "var(--color-yellow)"; // yellow
  }

  return (
    <div
      className={twMerge(
        "relative w-8 h-8 backdrop-brightness-50 rounded-full",
        className
      )}
    >
      <svg
        height={radius * 2}
        width={radius * 2}
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          stroke="#1f2937"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress circle */}
        <circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-500"
        />
      </svg>

      {/* Rating number */}
      <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-xs">
        {rating.toFixed(1)}
      </div>
    </div>
  );
};

export default RatingCircle;