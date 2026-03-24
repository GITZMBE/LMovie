'use client';

import Logo from "./Logo";
import Link from "next/link";
import { openMenuState, openSearchState } from "@/src/states";
import { useIsScrolledToTop } from "@/src/hooks";
import { twJoin } from "tailwind-merge";
import { FaRegBookmark, FaSearch } from "react-icons/fa";
import { useSession } from "next-auth/react";
import ProfileDropdown from "../../ui/ProfileDropdown";
import SearchModal from "../Search/SearchModal";
import { useState } from "react";

export const Header = () => {
  const { data: session, status } = useSession();
  const [openSearch, setOpenSearch] = useState(false);
  const isAtTop = useIsScrolledToTop(10);

  return (
    <header
      id='header'
      className={twJoin('fixed top-0 z-50 flex justify-center items-center w-full px-4 sm:px-12 transition-all duration-100 h-headerHeight', !isAtTop ? 'backdrop-blur-md backdrop-brightness-75' : '')}
    >
      <div
        className='container flex items-center justify-between sm:items-center gap-4 w-full max-h-23 sm:h-headerHeight z-20'
      >
        <Link
          href='/'
          onClick={() => {
            openMenuState.set(false);
            openSearchState.set(false);
          }}
        >
          <Logo display='flex' />
        </Link>
        <div className='flex gap-4 sm:gap-0 items-center'>
          <ProfileDropdown />
          <button 
            className="
              px-3 py-2
              rounded-md
              text-white
              hover:bg-white/10
              transition-all duration-150
            "
            onClick={() => setOpenSearch(true)}>
            <FaSearch className="text-white" />
          </button>
          {openSearch && <SearchModal onClose={() => setOpenSearch(false)} />}
          <Link
            href='/watchlist'
            className="
              px-3 py-2
              rounded-md
              text-white
              hover:bg-white/10
              transition-all duration-150
            "
          >
            <FaRegBookmark className="text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
