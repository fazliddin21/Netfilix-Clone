"use client";
import { useSession } from "next-auth/react";
import Login from "@/components/components/auth/login";
import { useGlobalContext } from "@/context/context";
import ProfileAcaunt from "@/app/components/profile/page";
import Loader from "@/components/components/loading";
import { useEffect } from "react";
import Common from "@/components/components/navbar/commond";

const Page = () => {
  const { account, pageLoading, setPageLoading } =
    useGlobalContext();
  const { data: session, status } = useSession();

  useEffect(() => {
    setPageLoading(false);
  }, []);
  if (session === null) return <Login />;
  if (pageLoading) {
    return <Loader />;
  }
  if (account === null) return <ProfileAcaunt />;
  return (
    <>
      <Common />
    </>
  );
};
export default Page;
