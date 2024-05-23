import React from 'react'

import logo from "../../../public/asoiu-logo.png";

import Image from 'next/image';


const Header = () => {
  return (
    <header>
    <div className=" flex  py-7 px-7">
      <div className="flex items-center gap-10 ">
        <h1 className="text-5xl sm:text-8xl text-main-text-color font-serif ">
          ASOIU
        </h1>
        <Image className='w-[100px] sm:w-[150px]' height={150} width={150} src={logo} alt='asoiu-logo'/>
      </div>
    </div>
  </header>
  )
}

export default Header