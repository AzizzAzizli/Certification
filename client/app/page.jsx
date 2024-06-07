"use client";

// import exampleCertifikate from "../public/certificateExample.png";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Input } from "@/shared/components/input";
import Header from "@/shared/components/header";
import { getAdmin } from "@/shared/services/methods";
import { Button } from "@/shared/components/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [admin, setAdmin] = useState();

  const [formData, setFormData] = useState({ username: "", password: "" });

  function getAdminData() {
    try {
      getAdmin().then((result) => {
        // console.log(result.result?.[0]);
        setAdmin(result.result?.[0]);
      });
    } catch (err) {
      console.log(err);
    }
  }
  function login() {
    const inputValues = Object.values(formData);

    if (inputValues.some((item) => !item)) {
      toast.error("Please fill the inputs",{
        toastId: `login-button-toast`,
      autoClose:1500,
      });
      return;
    }
    if (
      admin?.username !== formData.username &&
      admin?.password !== formData.password
    ) {
      toast.error("Username and Password are incorrect",{
        toastId: `login-button-toast`,
      autoClose:1500,
      });
      return;
    }
    if (admin?.username !== formData.username) {
      toast.error("Username is incorrect",{
        toastId: `login-button-toast`,
      autoClose:1500,
      });
      return;
    }
    if (admin?.password !== formData.password) {
      toast.error("Password is incorrect",{
        toastId: `login-button-toast`,
      autoClose:1500,
      });
      return;
    }

    setTimeout(() => {
      router.push("/search");
    }, 1000);
    localStorage.setItem("admin", JSON.stringify(admin));
    toast.success("You have successfully logged in!",{
      toastId: `login-button-toast`,
    autoClose:1500,
    });

    return;
  }

  function handleInputs(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    getAdminData();
  }, []);

  // console.log(formData);

  return (
    <body style={{ backgroundColor: "#617EFF" }} className=" min-h-screen  ">
      <ToastContainer stacked />
      {/* Header */}
      <Header />
      {/* Main */}

      <main>
        {/* Form */}
        <div className=" flex justify-center mt-10  w-full px-7 mb-10">
          <div className=" bg-white py-10 px-7 w-full sm:w-2/3 lg:w-1/3  rounded-tr-2xl  rounded-bl-2xl">
            <p className=" font-sans text-gray-500 text-3xl font-medium  mb-7 text-center">
              Login
            </p>
            <div className=" flex flex-col">
              <div className="flex flex-col gap-2">
                <label className="font-sans text-gray-500 text-xl font-medium">
                  User name
                </label>
                <Input
                  value={formData.username}
                  name={"username"}
                  onChange={handleInputs}
                  className={
                    "h-10 outline-none border-solid border border-gray-700 rounded-lg py-1 px-2 text-2xl font-medium font-sans text-gray-900 "
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-sans text-gray-500 text-xl font-medium">
                  Password
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  name={"password"}
                  onChange={handleInputs}
                  className={
                    "h-10 outline-none border-solid border border-gray-700 rounded-lg py-1 px-2 text-2xl font-medium text-gray-900 "
                  }
                />
              </div>
            </div>
            <div className="mt-7">
              <Button
                onClick={login}
                className={
                  "bg-blue-700 w-full h-10 rounded-md text-white font-sans text-xl"
                }
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
}
