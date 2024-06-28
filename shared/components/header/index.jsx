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

  function logout() {
    sessionStorage.removeItem("admin");
    toast.warning("You have been logged out.");
    setTimeout(() => {
      router.push("/");
    }, 750);
  }

  function changePage() {
    if (pathname === "/") {
      router.push("/admin");
      return;
    } else if (pathname === "/admin/new") {
      router.push("/");
      return;
    }
    return;
  }

  return (
    <header>
      <ToastContainer />
      <div className="  flex sm:flex-row  flex-col justify-between  py-3 px-5 ">
        <div className="flex items-center gap-10 ">
          <Image
            className="w-[70px] sm:w-[90px]"
            height={150}
            width={150}
            src={logo}
            alt="asoiu-logo"
          />
           <h1 className="text-4xl sm:text-6xl text-main-text-color font-serif ">
            ASOIU
          </h1>
        </div>
        {pathname !== "/admin" && (
          <div className="flex gap-2 items-center sm:mt-0 mt-4 justify-center">
            <div>
              <Button
                onClick={changePage}
                className={
                  "bg-gray-500 rounded h-auto text-xl px-3 py-1 text-white font-medium font-sans"
                }
              >
                {pathname === "/admin/new" ? "Search" : "Add new"}
              </Button>
            </div>
            {
              pathname === "/admin/new" &&
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
          }  
          
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
