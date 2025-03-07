import ProfileAcaunt from "@/app/components/profile/page";
import Login from "@/components/components/auth/login";
import Loader from "@/components/components/loading";
import { useGlobalContext } from "@/context/context";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/components/navbar/navbar";

const SearchPage = () => {
  let params = useParams();
  const { pageLoading, account, setPageLoading } =
    useGlobalContext();
  const { data: session }: any = useSession();

  useEffect(() => {
    setPageLoading(false);
  });

  if (session === null) return <Login />;
  if (pageLoading) {
    return <Loader />;
  }
  if (account === null) return <ProfileAcaunt />;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
          <h2>
            Showing Result for{" "}
            {decodeURI(params.query as string)}
          </h2>
        </div>
      </motion.div>
    </>
  );
};

export default SearchPage;
