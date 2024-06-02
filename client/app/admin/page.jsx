"use client";

// import exampleCertifikate from "../../public/certificateExample.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/shared/components/header";
import { uppercase } from "@/shared/utils";
import { postData,} from "@/shared/services/methods";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";

const Admin = () => {
  const isAdmin = JSON.parse(localStorage.getItem("admin")) || {};

  const router = useRouter();

  const fileInputRef = useRef(null);

  const [imgUrl, setImgUrl] = useState("");

  const [formData, setFormData] = useState({});

  const preset_key = "voicpatx";

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  function handleFormData(e) {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "name" || name === "surname") {
      value = uppercase(value);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function saveButton(e) {
    // console.log(Object.values(formData).every(item => item))
    if (!Object.values(formData).every((item) => item) || !imgUrl) {
      toast.error("Please fill all the inputs");
      return;
    }
    formData.cetificateImg = imgUrl;

    postData(formData)
      .then((data) => {
        // console.log(data);
        toast.success("Certificate added successfully");
        setFormData({ name: "", surname: "", serialNumber: "" });
        setImgUrl("");
        setLoadingImg(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
    checkLogin();
  }, []);

  return (
    <body style={{ backgroundColor: "#617EFF" }} className=" min-h-screen ">
      <ToastContainer />
      <Header />
      <main>
        {/* Form */}
        <div className=" flex justify-center mt-10  w-full px-7">
          <div className=" bg-white py-10 px-7 w-full sm:w-2/3 lg:w-1/3  rounded-tr-2xl  rounded-bl-2xl">
            <p className=" font-sans text-gray-500 text-4xl font-medium  mb-7 text-center">
              Add certificate
            </p>
            <div className=" flex flex-col">
              <div className="flex flex-col gap-2">
                <label className="font-sans text-gray-500 text-xl font-medium">
                  Name
                </label>
                <Input
                  value={formData.name}
                  name={"name"}
                  onChange={handleFormData}
                  className={
                    "h-10 outline-none border-solid border border-gray-700 rounded-lg py-1 px-2 text-xl font-medium font-sans text-gray-900 "
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-gray-500 text-xl font-medium">
                  Surname
                </label>
                <Input
                  value={formData.surname}
                  name={"surname"}
                  onChange={handleFormData}
                  className={
                    "h-10 outline-none border-solid border border-gray-700 rounded-lg py-1 px-2 text-xl font-medium font-sans text-gray-900 "
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-gray-500 text-xl font-medium">
                  Serial {"\u2116"}{" "}
                </label>
                <Input
                  value={formData.serialNumber}
                  name={"serialNumber"}
                  onChange={handleFormData}
                  className={
                    "h-10 outline-none border-solid border border-gray-700 rounded-lg py-1 px-2 text-xl font-medium font-sans text-gray-900 "
                  }
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label className="font-sans text-gray-500 text-xl font-medium">
                  Image file
                </label>
                {/* Upload Image */}
                <CldUploadButton
                  uploadPreset="voicpatx"
                  onSuccess={(result) => setImgUrl(result.info.secure_url)}
                
                >
                  <FontAwesomeIcon
                    onClick={handleClick}
                    className=" text-2xl  text-gray-500 cursor-pointer "
                    icon={faFolder}
                  />
                </CldUploadButton>
              </div>
            </div>
            <div className="mt-7">
              <Button
                onClick={saveButton}
                className={
                  "bg-blue-700 w-full h-10 rounded-md text-white font-sans text-xl"
                }
              >
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <p className="text-7xl text-center  font-sans font-bold text-gray-700 mt-16">
          Preview
        </p>
        <div className="flex flex-wrap mt-10 gap-4 justify-center">
          {imgUrl && (
            <img width={700} height={700} src={imgUrl} alt="certificate" />
          )}
        </div>
      </main>
    </body>
  );
};

export default Admin;
