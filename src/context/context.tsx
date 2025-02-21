"use client";
import {
  AccountProps,
  ChildProps,
  ContextType,
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

  return (
    <Context.Provider
      value={{
        account,
        setAccount,
        pageLoading,
        setPageLoading,
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
