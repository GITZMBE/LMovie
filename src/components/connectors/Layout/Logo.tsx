import React from "react";
import { FaStream } from "react-icons/fa";
import { twJoin } from "tailwind-merge";

interface Props {
  display?: string;
}

export const Logo = ({ display }: Props) => {
  return (
    <div
      className={twJoin(display === "flex"
        ? "flex items-center gap-4 hover:text-tertiary"
        : '', 'w-fit text-center uppercase text-gray-500')}
    >
      <FaStream
        size={38}
        className='w-full h-headerHeight min-w-9.5 hidden sm:block'
      />
      <div className='w-fit'>
        <p className='flex justify-between text-xl'>
          <span>T</span>
          <span>M</span>
          <span>D</span>
          <span>B</span>
        </p>
        <p className='w-28 text-sm'>Take A Chill Pill</p>
      </div>
    </div>
  );
}

export default Logo;
