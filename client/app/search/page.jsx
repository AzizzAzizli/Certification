"use client";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import exampleCertifikate from "../public/certificateExample.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/shared/components/input";
import { containsNumber } from "@/shared/utils";
import Header from "@/shared/components/header";
import Image from "next/image";
import { getData } from "@/shared/services/methods";
import { useRouter } from "next/navigation";

export default function Home() {
  const isAdmin = JSON.parse(localStorage.getItem("admin")) || {};

  const router = useRouter();

  const inputRef = useRef(null);

  const [certificatesData, setCertificateData] = useState([]);

  const [resultData, setResultData] = useState([]);

  async function getCertificates() {
    try {
      const data = await getData();
      // console.log(data);
      if (data.status === 200) {
        setCertificateData(data.result);
      } else {
        console.error("Failed to fetch certificates:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function renderCertificates() {
    if (!inputRef.current.value.trim()) {
      toast.error("Please fill the input");
      return;
    }

    let value = inputRef.current.value;

    // console.log(value);

    let valueForSearch = value.split(" ");

    if (valueForSearch.length === 1) {
      if (containsNumber(value)) {
        let result = certificatesData.filter((item) => {
          return item.serialNumber.toLowerCase() === value.toLowerCase();
        });
        // console.log(result);
        if (result.length === 0) {
          toast.error("Data not found");
          return;
        }
        setResultData(result);

        return;
      }

      let inputName = valueForSearch[0];

      let result = certificatesData.filter(
        (item) => item.name.toLowerCase() === inputName.toLowerCase()
      );
      // console.log(result);

      if (result.length === 0) {
        toast.error("Data not found");
        return;
      }
      setResultData(result);
    } else if (valueForSearch.length === 2) {
      let inputName = valueForSearch[0];

      let inputSurname = valueForSearch[1];

      let result = certificatesData.filter((item) => {
        return (
          item.name.toLowerCase() === inputName.toLowerCase() &&
          item.surname.toLowerCase() === inputSurname.toLowerCase()
        );
      });
      if (result.length === 0) {
        toast.error("Data not found");
        return;
      }
      // console.log(result);

      setResultData(result);
      // console.log(result);
    }

    inputRef.current.value = "";
  }

  function renderForKeyDown(e) {
    // console.log(e);
    if (e.key === "Enter") {
      renderCertificates();
      inputRef.current.value = "";
    }
  }

  function checkLogin() {
    if (Object.values(isAdmin).length === 0) {
      toast.error("You are not admin");
      setTimeout(() => {
        router.push("/");
      }, 750);
      return;
    }
    return;
  }

  useEffect(() => {
    // console.log(isAdmin);

    checkLogin();
    getCertificates();
  }, []);

  // console.log(certificatesData);

  return (
    <body style={{ backgroundColor: "#617EFF" }} className=" min-h-screen  ">
      <ToastContainer />
      {/* Header */}
      <Header />
      {/* Main */}
      <main>
        <div className=" flex justify-center mt-12">
          <p className="text-3xl text-center  text-gray-700 font-bold font-sans">
            Search certificates
          </p>
        </div>

        {/* Input area */}
        <div className="flex justify-center   mt-16 px-12 md:px-0  ">
          <div className=" w-full  md:w-1/2  bg-white flex gap-1 rounded-3xl overflow-hidden  pr-4   ">
            <div className="flex items-center pl-3   t font-medium  ">
              <p className="text-xl text-main-color  border-solid border-r-2 border-r-gray-600 pr-3 font-sans  ">
                Search
              </p>
            </div>
            <Input
              placeholder={"Name Surname or id"}
              onKeyDown={renderForKeyDown}
              inputRef={inputRef}
              className={
                " text-xl font-semibold w-full font-sans h-14 pr-7 pl-3 outline-none"
              }
            />
            <div className="flex items-center">
              <FontAwesomeIcon
                onClick={renderCertificates}
                className="text-2xl text-main-color cursor-pointer"
                icon={faMagnifyingGlass}
              />
            </div>
          </div>
        </div>

        {/* Certificates */}

        <div className="flex flex-wrap mt-20 gap-4 justify-center px-5">
          {resultData.map((item) => {
            return (
              <Image
                key={item._id}
                width={350}
                height={350}
                // className="h-auto"
                src={item.cetificateImg}
                alt={item.name + " " + item.surname + "-" + "certificate"}
              />
            );
          })}
        </div>
      </main>
    </body>
  );
}