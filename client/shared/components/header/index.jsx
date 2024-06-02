"use client";
import React from "react";

import logo from "../../../public/asoiu-logo.png";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../button";
import { ToastContainer, toast } from "react-toastify";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  console.log(pathname);

  function logout() {
    localStorage.removeItem("admin");
    toast.warning("You have been logged out.");
    setTimeout(() => {
      router.push("/");
    }, 750);
  }

  function changePage() {
    if (pathname === "/admin") {
      router.push("/search");
      return;
    } else if (pathname === "/search") {
      router.push("/admin");
      return;
    }
    return;
  }

  return (
    <header>
      <ToastContainer />
      <div className=" flex justify-between  py-3 px-5">
        <div className="flex items-center gap-10 ">
          <h1 className="text-5xl sm:text-7xl text-main-text-color font-serif ">
            ASOIU
          </h1>
          <Image
            className="w-[100px] sm:w-[120px]"
            height={150}
            width={150}
            src={logo}
            alt="asoiu-logo"
          />
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <Button
              onClick={changePage}
              className={
                "bg-gray-500 rounded h-auto text-xl px-3 py-1 text-white font-medium font-sans"
              }
            >
              {pathname === "/admin" ? "Search" : "Admin"}
            </Button>
          </div>
          <div>
            <Button
              onClick={logout}
              className={
                "bg-gray-500 rounded h-auto text-xl px-3 py-1 text-white font-medium font-sans"
              }
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
