import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { string } from "zod";

interface ImgProps {
  image: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}
const CustumImg = ({
  image,
  alt,
  className,
  onClick,
}: ImgProps) => {
  let [isloading, setIsLoading] =
    useState<boolean>(true);
  return (
    <>
      <Image
        src={image}
        alt={alt}
        className={cn(
          "object-cover duration-700 ease-in-out group-hover:opacity-75",
          isloading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0",
          className
        )}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoad={() => setIsLoading(false)}
        onClick={onClick}
        priority
      />
    </>
  );
};

export default CustumImg;
