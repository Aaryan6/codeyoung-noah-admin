"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LoaderIcon, MoveRight } from "lucide-react";

type Props = {};

const NoahQuiz = (props: Props) => {
  const [loader, setLoader] = useState<boolean>(false);
  const sandboxUrl =
    process.env.NEXT_PUBLIC_SANDBOX_URL || "https://sandbox.codeyoung.com";
  const router = useRouter();
  const goToHomePage = () => {
    setLoader(true);
    setTimeout(() => {
      router.push(`/`);
      setLoader(false);
    }, 400);
  };
  return (
    <div className="bg-[#F0F6FA] p-3 md:flex justify-around xs:flex-col">
      <div className="flex md:justify-self-center md:self-center justify-center">
        Noah
      </div>
      <div className="flex-col justify-center md:w-[50%] pt-5 pb-5 xs:w-full mx-auto">
        <div className="flex justify-center text-center">
          Noah will focus on aligning your future quizzes to master your areas
          of improvement
        </div>
        <div className="flex justify-center text-center">
          <Button
            className="w-max px-11 mt-[1rem] py-6 bg-[#E98451] text-lg font-semibold text-[#FFF] hover:bg-[#E98451]"
            onClick={() => goToHomePage()}
          >
            Continue{" "}
            {loader ? (
              <LoaderIcon color="inherit" size={25} className="ml-2" />
            ) : (
              <MoveRight className="ml-[0.5rem]" fontSize="small" />
            )}
          </Button>
        </div>
        <div className="mt-[1rem] flex justify-center">
          <div className="justify-self-center self-center">or</div>
          <Button
            className="w-max bg-transparent hover:bg-transparent text-lg font-semibold text-[#E98451]"
            onClick={() => window.open(sandboxUrl, "_blank")}
          >
            Go Back to Sandbox
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoahQuiz;
