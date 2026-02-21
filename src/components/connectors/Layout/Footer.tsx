'use client';

import Logo from "./Logo";

function Footer() {
  return (
    <footer id='footer' className='flex justify-between items-center bg-secondary'>
      <div className="w-full lg:max-w-3xl xl:max-w-5xl mx-12">
        <div className="w-full py-8 border-b border-b-[#D7D7D7]">
          <Logo />
        </div>
        <div className="w-full flex justify-center p-8">
          <span className="text-[#D7D7D7] text-xs">@2026 LMovie. All rights reserved.</span>
        </div>        
      </div>
    </footer>
  );
}

export default Footer;
