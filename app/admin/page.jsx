"use client";

import { Button } from "@/shared/components/button";
// import exampleCertifikate from "../../public/certificateExample.png";
import Header from "@/shared/components/header";
import { Input } from "@/shared/components/input";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ref as reff, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

// import Image from "next/image";
import React, { useRef, useState } from "react";
import { db, fileStorage } from "@/shared/services/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import { uppercase } from "@/shared/utils";

const Admin = () => {

  const fileInputRef = useRef(null);

  let certificates = ref(db, "certificates");

  const [imgUrl, setImgUrl] = useState("");

  const [loadingImg, setLoadingImg] = useState(false);

  const [formData, setFormData] = useState({});

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

    push(certificates, formData).then(() => {
      toast.success("Certificate added successfully");
      setFormData({ name: "", surname: "", serialNumber: "" });
      setImgUrl("");
      setLoadingImg(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });

    // console.log(formData);
  }

  function getImage(e) {
    const name = e?.target?.files?.[0]?.name;
    if (!name) {
      return;
    }
    const imageRef = reff(fileStorage, `files/images/${name}`);

    const file = e?.target?.files?.[0];
    if (!file) {
      return;
    }
    uploadBytes(imageRef, file).then((snapshot) => {
      setLoadingImg(true);
      getDownloadURL(snapshot.ref).then((url) => {
        setImgUrl(url);
        setLoadingImg(false);
        // console.log(url);
      });
    });
  }

  return (
    <body style={{ backgroundColor: "#617EFF" }} className=" min-h-screen ">
      <ToastContainer />
      <Header />
      <main>
        {/* Form */}
        <div className=" flex justify-center mt-16  w-full px-9">
          <div className=" bg-white py-16 px-9 w-full sm:w-2/3 lg:w-1/2  rounded-tr-2xl  rounded-bl-2xl">
            <p className=" font-sans text-gray-500 text-4xl font-medium  mb-7 text-center">
              Add certificate
            </p>
            <div className=" flex flex-col">
              <div className="flex flex-col gap-2">
                <label className="font-sans text-gray-500 text-2xl font-medium">
                  Name
                </label>
                <Input
                  value={formData.name}
                  name={"name"}
                  onChange={handleFormData}
                  className={
                    "h-14 outline-none border-solid border border-gray-700 rounded-lg py-2 px-3 text-2xl font-medium text-gray-900 "
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-gray-500 text-2xl font-medium">
                  Surname
                </label>
                <Input
                  value={formData.surname}
                  name={"surname"}
                  onChange={handleFormData}
                  className={
                    "h-14 outline-none border-solid border border-gray-700 rounded-lg py-2 px-3 text-2xl font-medium text-gray-900 "
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-gray-500 text-2xl font-medium">
                  Serial {"\u2116"}{" "}
                </label>
                <Input
                  value={formData.serialNumber}
                  name={"serialNumber"}
                  onChange={handleFormData}
                  className={
                    "h-14 outline-none border-solid border border-gray-700 rounded-lg py-2 px-3 text-2xl font-medium text-gray-900 "
                  }
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label className="font-sans text-gray-500 text-2xl font-medium">
                  Image file
                </label>

                <Input
                  onChange={getImage}
                  inputRef={fileInputRef}
                  className={" hidden "}
                  id="file-input"
                  type="file"
                  acceptFormat="image/*"
                />

                <FontAwesomeIcon
                  onClick={handleClick}
                  className=" text-4xl  text-gray-500 cursor-pointer "
                  icon={faFolder}
                />
              </div>
            </div>
            <div className="mt-7">
              <Button
                onClick={saveButton}
                className={
                  "bg-blue-700 w-full h-14 rounded-md text-white font-sans text-2xl"
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
          {/* {loadingImg ? (
            <p className=" text-4xl  font-sans font-bold text-gray-500">
              Loading...
            </p>
          ) : (
            <Image width={700} height={700} src={imgUrl} alt="certificate" />
          )} */}

          {/* {loadingImg ? (
            <p className=" text-4xl  font-sans font-bold text-gray-500">
              Loading...
            </p>
          ) : imgUrl ? (
            <img width={700} height={700} src={imgUrl} alt="certificate" />
          ) : (
            ""
          )} */}

          {loadingImg && (
            <p className="text-4xl font-sans font-bold text-gray-700">
              Loading...
            </p>
          )}
          {imgUrl && (
            <img width={700} height={700} src={imgUrl} alt="certificate" />
          )}
        </div>
      </main>
    </body>
  );
};

export default Admin;

