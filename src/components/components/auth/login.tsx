import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { CgGoogle } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
const Login = () => {
  return (
    <div className="w-full h-screen">
      <div className="absolute inset-0">
        <Image
          src={
            "https://repository-images.githubusercontent.com/299409710/b42f7780-0fe1-11eb-8460-e459acd20fb4"
          }
          alt="hello"
          fill
        />
      </div>
      <div className="relative text-center z-10 w-[600px] px-8 py-4 bg-black/60 h-[50vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  ">
        <h1 className="text-4xl font-bold ">
          Login
        </h1>
        <Button
          onClick={() => signIn("github")}
          className="mt-4 flex items-center gap-2 w-full h-[56px]  bg-red-600 !text-white hover:bg-red-500"
        >
          <FaGithub className="w-7 h-7" />
          Git hup orqali kirish
        </Button>
        <Button
          onClick={() => signIn("google")}
          className="mt-4 flex items-center gap-2 w-full h-[56px] text-black  bg-white  hover:bg-black hover:text-white "
        >
          <CgGoogle />
          Google Orqali kirish
        </Button>
      </div>
    </div>
  );
};
export default Login;
