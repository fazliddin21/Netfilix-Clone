"use client";
import {
  AccountProps,
  ChildProps,
  ContextType,
  MovieProps,
} from "@/types/main";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const Context =
  createContext<ContextType | null>(null);
const GlobalContext = ({
  children,
}: ChildProps) => {
  const [account, setAccount] =
    useState<AccountProps | null>(null);
  let [pageLoading, setPageLoading] =
    useState<boolean>(true);
  useEffect(() => {
    setAccount(
      JSON.parse(
        sessionStorage.getItem("account")!
      )
    );
  }, []);

  let [open, setOpen] = useState(false);

  let [movie, setMovie] =
    useState<MovieProps | null>(null);

  return (
    <Context.Provider
      value={{
        movie,
        setMovie,
        account,
        setAccount,
        pageLoading,
        setPageLoading,
        open,
        setOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default GlobalContext;
export const useGlobalContext = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContext"
    );
  }
  return context;
};
