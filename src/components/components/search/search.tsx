"use client";
import { Input } from "@/components/ui/input";
import { useGlobalContext } from "@/context/context";
import { Search } from "lucide-react";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import React, { KeyboardEvent } from "react";

interface SearchBarProps {
  setOpenSearch: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}
const SearchBar = ({
  setOpenSearch,
}: SearchBarProps) => {
  let [query, setQuaery] = React.useState("");

  const router = useRouter();
  const { setPageLoading } = useGlobalContext();
  const pathname = usePathname();
  const handleKeySubmit = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Enter" &&
      query &&
      query.trim() !== ""
    ) {
      setPageLoading(true);
      if (pathname !== "/searchs") {
        router.replace(`/searchs/${query}`);
      } else {
        router.push(`/searchs/${query}`);
      }
    }
  };
  return (
    <div className="hidden md:flex justify-center items-center text-center">
      <div className="bg-[rgba(0,0,0,0,0/75)] border  border-[hsla(0,0%,100%,0.85)] px-4 items-center text-center flex ">
        <div className="order-2">
          <input
            value={query}
            onChange={(e) =>
              setQuaery(e.target.value)
            }
            onKeyUp={handleKeySubmit}
            placeholder="Search TV and Movies"
            className="bg-transparent text-[14px] font-medium h-[34p] px-4 py-2 placeholder:text-[14px] font-md text-white outline-none w-[310px] "
          />
        </div>
        <button>
          <Search
            onClick={() =>
              setOpenSearch((prev) => !prev)
            }
            className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
