'use client';

import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { fetchQuery } from "../../../api";
import { BsFilterSquare } from "react-icons/bs";
import { MdLocalMovies } from "react-icons/md";
import Logo from "./Logo";
import Menu from "./Menu";
import { Video } from "../../../models";
import Poster from "../../ui/Poster";
import Link from "next/link";
import { openMenuState, openSearchState } from "@/src/states";
import { useStore } from "@nanostores/react";
import { useIsScrolledToTop } from "@/src/hooks";
import { twJoin } from "tailwind-merge";

export const Header = () => {
  const openSearch = useStore(openSearchState);
  const menuOpen = useStore(openMenuState);
  const [searchResult, setSearchResult] = useState<Video[]>([]);

  const isAtTop = useIsScrolledToTop(10);
  const openMenu = () => {
    openMenuState.set(!menuOpen);
  };
  useEffect(() => {
    const searchBar: HTMLElement = document.getElementById("searchBar") as HTMLElement;
    const header: HTMLElement = document.getElementById("header") as HTMLElement;
    const movieSection: HTMLElement = document.getElementById("movieSection") as HTMLElement;
    if (openSearch) {
      searchBar.classList.remove("w-0");
      searchBar.classList.add("w-full", "px-2");
      searchBar.focus();
      header.classList.add("h-screen", "min-h-screen", "items-start");
      header.classList.remove("sm:max-h-[60px]", "items-center");
      movieSection.classList.add("h-full", "py-4");
      openMenuState.set(false);
    } else {
      searchBar.classList.add("w-0");
      searchBar.classList.remove("w-full", "px-2");
      searchBar.blur();
      setSearchResult([]);
      header.classList.remove("h-screen", "min-h-screen", "items-start");
      header.classList.add("sm:max-h-[60px]", "items-center");
      movieSection.classList.remove("h-full", "py-4");
    }
  }, [openSearch]);
  const [search, setSearch] = useState("");
  const handleClick = () => {
    openMenuState.set(!openSearch);
    setSearch("");
    setSearchResult([]);
  };
  const onSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      fetchQuery(search).then(setSearchResult);
    }
  };
  const handleClickPoster = () => {
    openSearchState.set(!openSearch);
  };
  return (
    <header
      id='header'
      className={twJoin('fixed top-0 z-30 flex flex-col justify-start w-full h-23 transition-all duration-100 sm:h-headerHeight overflow-y-hidden', !isAtTop ? 'backdrop-blur-md backdrop-brightness-75' : '')}
    >
      <div
        className='flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-4 w-full max-h-23 sm:h-headerHeight px-4 sm:px-12 z-20'
      >
        <Link
          href=''
          onClick={() => {
            openMenuState.set(false);
            openSearchState.set(false);
          }}
        >
          <Logo display='flex' />
        </Link>
        <div className='flex gap-4 sm:gap-0 items-center w-full'>
          <div
            id='search-container'
            className='flex justify-end items-center w-full'
          >
            <input
              type='text'
              id='searchBar'
              className='w-0 outline-none text-sm transitioning'
              value={search}
              onChange={onSearch}
              onKeyPress={handleKeyPress}
            />
            <button className='px-2'>
              <BiSearch
                size={22}
                className='fill-white hover:text-shadow-white hover:text-shadow-2xs z-30'
                onClick={handleClick}
              />
            </button>
          </div>
          <Link
            href=''
            className='hidden sm:flex text-lg font-semibold px-2 text-gray-400 hover:text-white'
            onClick={() => {
              openMenuState.set(false);
              openSearchState.set(false);
            }}
          >
            <AiFillHome />
          </Link>
          <Link
            href='/filter'
            className='hidden sm:flex text-lg font-semibold px-2 text-gray-400 hover:text-white'
            onClick={() => {
              openMenuState.set(false);
              openSearchState.set(false);
            }}
          >
            <BsFilterSquare />
          </Link>
          <Link
            href='/genres'
            className='hidden sm:flex text-lg font-semibold px-2 text-gray-400 hover:text-white'
            onClick={() => {
              openMenuState.set(false);
              openSearchState.set(false);
            }}
          >
            <MdLocalMovies />
          </Link>
          <AiOutlineMenu
            size={22}
            className='fill-gray-400 hover:fill-white cursor sm:hidden block cursor-pointer'
            onClick={openMenu}
          />
        </div>
      </div>
      <div
        className={`fixed top-0 flex justify-center items-start w-full max-h-screen overflow-y-auto ${openSearch && "py-12"} hide-scrollbar`}
      >
        <div
          id='movieSection'
          className='flex flex-wrap justify-center sm:justify-start items-start gap-4 pt-8 px-12 w-full max-w-352'
        >
          {searchResult.length
            ? searchResult.map(({ id, type, title, description, posterPath, backdropPath, releaseDate, rating, genreIds }) => (
                <div
                  key={id}
                  className='w-fit h-fit'
                  onClick={handleClickPoster}
                >
                  <Poster id={id} type={type} title={title} description={description} posterPath={posterPath} backdropPath={backdropPath} releaseDate={releaseDate} rating={rating} genreIds={genreIds} />
                </div>
              ))
            : null}
        </div>
      </div>
      <Menu />
    </header>
  );
};

export default Header;
