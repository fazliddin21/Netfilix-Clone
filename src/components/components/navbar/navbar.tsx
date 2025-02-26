import Image from "next/image";
import React from "react";
import { menuItem } from "../../../../constant/constant";
import { MenuItemType } from "@/types/main";
import { Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGlobalContext } from "@/context/context";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import SearchBar from "../search/search";
import { useRouter } from "next/navigation";
import MoviePopup from "../cart/movie-popap";

const Navbar = () => {
  // [----------------------------------------Hook bo'limlari---------------------------------------------------------------------]
  let { account, setAccount, setPageLoading } =
    useGlobalContext();

  let [openSearch, setOpenSearch] =
    React.useState(false);

  const router = useRouter();
  // [---------------------------------Funsikya bolimlari-------------------------------------------------------------]
  let LogOut = () => {
    sessionStorage.removeItem("account");
    signOut();
    setAccount(null);
  };
  return (
    <div className="relative">
      <header className=" fixed top-0 z-50 w-full flex items-center justify-between px-4 h-[68px] transition lg:px-14 text-white hover:bg-[#141414] ">
        <div className="flex  items-center h-full space-x-2 md:space-x-10">
          <Image
            src={
              "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            }
            width={120}
            height={120}
            className="cursor-pointer object-contain"
            alt="Netflix Logo"
          />
          <nav>
            <ul className="hidden md:space-x-4  md:flex cursor-pointer">
              {menuItem?.map(
                (item: MenuItemType) => {
                  return (
                    <li
                      onClick={() => {
                        router.push(item.path);
                        setPageLoading(true);
                      }}
                      key={item.id}
                      className=" cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4] hover:text-[#b3b3b3]"
                    >
                      {item.title}
                    </li>
                  );
                }
              )}
            </ul>
          </nav>
        </div>

        <MoviePopup />
        <div className="flex items-center gap-2">
          {openSearch ? (
            <SearchBar
              setOpenSearch={setOpenSearch}
            />
          ) : (
            <Search
              onClick={() =>
                setOpenSearch((prev) => !prev)
              }
              className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer"
            />
          )}

          <Popover>
            <PopoverTrigger>
              <div
                className="flex gap-2 pl-[20px] items-center  cursor-pointer
              "
              >
                <img
                  src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                  alt="Currunt search "
                  className=" max-w-[30px] rounded min-w-[20px] min-h-[20px] max-h-[30px] object-cover w-[30px] h-[30px] "
                />
                <p>
                  {account ? account.name : ""}
                </p>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Button
                onClick={LogOut}
                variant={"outline"}
                className="mt-4 text-center w-full text-sm font-light hover:bg-slate-800 rounded-md py-2 border border-white"
              >
                Log out
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
