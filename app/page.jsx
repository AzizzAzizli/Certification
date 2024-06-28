"use client";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Input } from "@/shared/components/input";
import { containsNumber } from "@/shared/utils";
import Header from "@/shared/components/header";
import Image from "next/image";
import { getData } from "@/shared/services/methods";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css"; // Bu satırı ekleyin

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [certificatesData, setCertificateData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCertificates();
  }, []);

  async function getCertificates() {
    try {
      const data = await getData();
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
    if (!inputValue.trim()) {
      toast?.error("Please fill the input", {
        toastId: `search-button-toast`,
        autoClose: 1500,
      });
      return;
    }

    let valueForSearch = inputValue.split(" ");

    let result = [];

    if (valueForSearch.length === 1) {
      if (containsNumber(inputValue)) {
        result = certificatesData.filter(
          (item) => item.serialNumber.toLowerCase() === inputValue.toLowerCase()
        );
      } else {
        result = certificatesData.filter(
          (item) => item.name.toLowerCase() === inputValue.toLowerCase()
        );
      }
    } else if (valueForSearch.length === 2) {
      const [inputName, inputSurname] = valueForSearch;
      result = certificatesData.filter(
        (item) =>
          item.name.toLowerCase() === inputName.toLowerCase() &&
          item.surname.toLowerCase() === inputSurname.toLowerCase()
      );
    }

    if (result.length === 0) {
      toast?.error("Data not found", {
        toastId: `search-button-toast`,
        autoClose: 1500,
      });
    } else {
      setResultData(result);
    }

    setInputValue("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      renderCertificates();
    }
  }

  return (
    <div style={{ backgroundColor: "#617EFF" }} className=" min-h-screen  ">
      {/* <ToastContainer stacked limit={1} /> */}
      <Header />
      <main>
        <div className=" flex justify-center mt-12">
          <p className="text-3xl text-center  text-gray-700 font-bold font-sans">
            Search certificates
          </p>
        </div>

        <div className="flex justify-center   mt-16 px-12 md:px-0  ">
          <div className=" w-full  md:w-1/2  bg-white flex gap-1 rounded-3xl overflow-hidden  pr-4   ">
            <div className="flex items-center pl-3   t font-medium  ">
              <p className="text-xl text-main-color  border-solid border-r-2 border-r-gray-600 pr-3 font-sans  ">
                Search
              </p>
            </div>
            <Input
              placeholder={"Name Surname or id"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
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

        <div className="flex flex-wrap mt-20 gap-4 justify-center px-5">
          {resultData.map((item) => (
            <img
              key={item._id}
              width={350}
              height={350}
              src={item.cetificateImg}
              alt={`${item.name} ${item.surname} - certificate`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
