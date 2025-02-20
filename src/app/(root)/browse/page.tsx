"use client";
import { useSession } from "next-auth/react";
import Login from "@/components/components/auth/login";
import { useGlobalContext } from "@/context/context";
import ProfileAcaunt from "@/app/components/profile/page";

const Page = () => {
  const { account } = useGlobalContext();
  const { data: session, status } = useSession();

  if (session === null) return <Login />;
  if (account === null) return <ProfileAcaunt />;

  return <div>{session?.user?.name}</div>;
};
export default Page;
