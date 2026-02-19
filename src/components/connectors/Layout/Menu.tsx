import { useEffect, useState } from "react";
import { openMenuState, openSearchState } from "../../../states";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AiFillHome } from "react-icons/ai";
import { BsFilterSquare } from "react-icons/bs";
import { MdLocalMovies } from "react-icons/md";
import Link from "next/link";

function Menu() {
  const [menuOpen, setMenuOpen] = useRecoilState(openMenuState);
  const setOpenSearch = useSetRecoilState(openSearchState);
  const clickLink = () => {
    setMenuOpen(false);
    setOpenSearch(false);
  };
  const [animation, setAnimation] = useState("");
  useEffect(() => {
    if (menuOpen) {
      setAnimation("animate-show-menu");
      setOpenSearch(false);
    } else {
      setAnimation("animate-hide-menu");
    }
  }, [menuOpen, setOpenSearch]);
  return (
    <div
      id='menu'
      className={`fixed sm:hidden z-10 right-0 h-full w-0 pt-20 sm:pt-headerHeight pb-4 bg-primary animate-hide-menu ${animation}`}
    >
      <ul className='lg:max-w-75 py-4 text-gray-500 text-3xl font-bold'>
        <li
          className='flex py-2 px-2 w-full hover:text-tertiary hover:bg-secondary hover:border-l-2 hover:border-tertiary'
          onClick={clickLink}
        >
          <Link
            href='/dashboard'
            className='flex grow justify-between items-center w-full'
          >
            Home&ensp;
            <AiFillHome />
          </Link>
        </li>
        <li
          className='flex py-2 px-2 w-full hover:text-tertiary hover:bg-secondary hover:border-l-2 hover:border-tertiary'
          onClick={clickLink}
        >
          <Link
            href={"/filter"}
            className='flex grow justify-between items-center w-full'
          >
            Filter&ensp;
            <BsFilterSquare />
          </Link>
        </li>
        <li
          className='flex py-2 px-2 w-full hover:text-tertiary hover:bg-secondary hover:border-l-2 hover:border-tertiary'
          onClick={clickLink}
        >
          <Link
            href={"/genres"}
            className='flex grow justify-between items-center w-full'
          >
            Genres&ensp;
            <MdLocalMovies />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
