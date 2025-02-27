// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import React, { useState } from "react";
// import { string } from "zod";


// interface ImgProps {
//     image :string;
//     alt:string
//     className?:string

// }
// const CustumImg = ({image,alt,className}:ImgProps) => {
//     let[isloading,setIsLoading] = useState<boolean>(false)
//   return <>
//   <Image src={image} alt={alt}  className={cn("object-cover duration-700 ease-in-out group-hover:opacity-75",
//     isloading ? "scale-110 blur-2xl grayscale" :"scale-100 blur-0 grayscale-0",
//     className
//   )}
//   fill
//   onLoadingComplete={()=>setIsLoading(false)}/>
//   </>;
// };

// export default CustumImg;
