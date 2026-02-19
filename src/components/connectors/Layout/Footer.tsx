'use client';

import { AiFillFolderOpen } from "react-icons/ai";
import Logo from "./Logo";
import Providers from "../../Providers";

function Footer() {
  return (
    <footer id='footer' className='space-y-8 bg-secondary'>
      <div className='grid justify-start sm:justify-between sm:grid-cols-2 md:grid-cols-4 gap-4 py-4 px-12 text-gray-400'>
        <div id='about'>
          <ul className='space-y-2'>
            <li>
              <h3 className='uppercase text-lg font-bold'>About Us</h3>
            </li>
            <li>
              <a href='./#' className='hover:text-white'>
                About TMDB
              </a>
            </li>
            <li>
              <a href='./#' className='hover:text-white'>
                Contact Us
              </a>
            </li>
            <li>
              <a href='./#' className='hover:text-white'>
                Terms of service
              </a>
            </li>
            <li>
              <a href='./#' className='hover:text-white'>
                API
              </a>
            </li>
            <li>
              <a href='./#' className='hover:text-white'>
                Movies
              </a>
            </li>
            <li>
              <a href='./#' className='hover:text-white'>
                TV Series
              </a>
            </li>
            <li>
              <a href='./#' className='hover:text-white'>
                Top IMDb
              </a>
            </li>
          </ul>
        </div>
        <div id='genres'>
          <ul className='space-y-2'>
            <li>
              <h3 className='uppercase text-lg font-bold'>Genres</h3>
            </li>
            <li>
              <a href='./#' className='flex gap-2 hover:text-white'>
                <AiFillFolderOpen size={22} /> Action
              </a>
            </li>
            <li>
              <a href='./#' className='flex gap-2 hover:text-white'>
                <AiFillFolderOpen size={22} /> Crime
              </a>
            </li>
            <li>
              <a href='./#' className='flex gap-2 hover:text-white'>
                <AiFillFolderOpen size={22} /> Drama
              </a>
            </li>
            <li>
              <a href='./#' className='flex gap-2 hover:text-white'>
                <AiFillFolderOpen size={22} /> Fantasy
              </a>
            </li>
            <li>
              <a href='./#' className='flex gap-2 hover:text-white'>
                <AiFillFolderOpen size={22} /> Horror
              </a>
            </li>
            <li>
              <a href='./#' className='flex gap-2 hover:text-white'>
                <AiFillFolderOpen size={22} /> Mystery
              </a>
            </li>
          </ul>
        </div>
        <div></div>
        <div id='legal'>
          <ul>
            <li className='flex justify-start md:justify-center lg:justify-end'>
              <Logo />
            </li>
          </ul>
        </div>
      </div>
      <Providers />
    </footer>
  );
}

export default Footer;
