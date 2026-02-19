import React, { useState, useEffect } from "react";
import { fetchReviews } from "../api/fetch";
import { Review, VideoType } from "../models";
import { splitReviewsDate } from "../utils";

interface Props {
  id: number;
  type?: VideoType;
}

function Reviews({ id, type = 'movie' }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews(id, type).then(setReviews);
  }, [id]);

  return (
    <div
      id='reviews'
      className={`w-full ${
        Object.keys(reviews).length > 0 && "py-4"
      } space-y-4`}
    >
      {Object.keys(reviews).length > 0
        ? reviews.map(({ author, content, createdAt, updatedAt }, index) => (
            <div key={index} className='space-y-2 p-4 bg-secondary rounded-xl'>
              <p>
                Written by{" "}
                <span className='text-quaternary'>{author}</span>
                <br />
                Posted at{" "}
                <span className='text-quaternary'>
                  {splitReviewsDate(createdAt)}
                </span>
              </p>
              <p className='flex flex-col w-full'>
                <span className='w-full max-h-48 overflow-y-hidden'>
                  {content}
                </span>
                <span className='w-full text-right text-quaternary'>
                  Latest updated at {splitReviewsDate(updatedAt)}
                </span>
              </p>
            </div>
          ))
        : null}
    </div>
  );
}

export default Reviews;
