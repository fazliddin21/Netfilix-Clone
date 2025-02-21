"use client";
import CreateAccountForm from "@/components/components/auth/createAcaunt";
import "../../globals.css";
import Loginform from "@/components/components/auth/loginform";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import React, {
  useEffect,
  useState,
} from "react";
import { MdDelete } from "react-icons/md";
import { TbLockFilled } from "react-icons/tb";
import {
  AccountProps,
  AxiosType,
} from "@/types/main";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

// -------------------------------------------Imports --------------------------------------------------------------
const ProfileAcaunt = () => {
  let [isDelete, setIsDelete] =
    useState<boolean>(false);
  let [open, setOpen] = useState<boolean>(false);
  let [isAuth, setIsAuth] = useState<
    "login" | "create"
  >("create");
  let [accounts, setAccounts] = useState<
    AccountProps[]
  >([]);
  const [isLoading, setIsLoading] =
    useState<boolean>(true);
  let [curruntAcaunt, setCurruntAcaunt] =
    React.useState<AccountProps | null>(null);
  // [------------------------------------------------------]
  const { data: session }: any = useSession();

  useEffect(() => {
    if (!session?.user?.uid) return;
    let isMounted = true;

    const getAllAccount = async () => {
      setIsLoading(true);
      try {
        const { data } =
          await axios.get<AxiosType>(
            `/api/account?uid=${session.user.uid}`
          );
        if (data.success && isMounted) {
          setAccounts(
            data.data as AccountProps[]
          );
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "Something went wrong, try again later",
        });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getAllAccount();

    return () => {
      isMounted = false;
    };
  }, [session?.user?.uid]);

  let onDelete = async (id: string) => {
    try {
      let isConfirim = confirm("Are you sure?");
      if (isConfirim) {
        const { data } =
          await axios.delete<AxiosType>(
            `/api/account?id=${id}`
          );
        if (data.success) {
          setAccounts(
            accounts.filter(
              (item) => item._id !== id
            )
          );
          return toast({
            title: "Account deleted successfully",
          });
        } else {
          return toast({
            variant: "destructive",
            title: "Error",
            description:
              "There was a problem opening the account.",
          });
        }
      }
    } catch (error) {
      return toast({
        variant: "destructive",
        title: "Error",
        description:
          "Something went wrong, try again later",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center flex-col items-center relative">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-white font-bold text-[36px] my-12">
          Who's watching?
        </h2>

        {isLoading ? (
          <ul className="flex p-0 my-12 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <li
                key={item}
                className="max-w-[1200px] w-[155px] min-w-[200px] flex flex-col items-center gap-3"
              >
                <div className="relative">
                  <div className="w-[155px] h-[155px] bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="w-24 h-6 bg-gray-700 animate-pulse rounded"></div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex p-0 my-12">
            {accounts?.map((item) => (
              <li
                key={item._id}
                onClick={() => {
                  if (!isDelete) return;
                  setOpen(true);
                  setIsAuth("login");
                  setCurruntAcaunt(item);
                }}
                className="max-w-[1200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px]"
              >
                <div className="relative">
                  <div className="max-w-[200px] rounded min-w-[84px] max-h-[200px] object-cover w-[155px] h-[155px] relative">
                    <Image
                      src="https://img.freepik.com/premium-vector/vector-flat-illustration-avatar-user-profile-person-icon-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1723.jpg"
                      alt="accounts"
                      fill
                      priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  {!isDelete ? (
                    <div
                      onClick={() =>
                        onDelete(item._id)
                      }
                      className="absolute transform top-0 left-0 z-10 cursor-pointer"
                    >
                      <MdDelete className="w-8 h-8 text-red-600 hover:text-red-300" />
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-2xl">
                    {item.name}
                  </span>
                  <TbLockFilled className="w-6 h-6" />
                </div>
              </li>
            ))}
            {accounts?.length < 4 && (
              <li
                onClick={() => {
                  setOpen(true);
                  setIsAuth("create");
                }}
                className="border cursor-pointer text-[#616161] bg-[#F6F6F4] font-bold text-2xl border-black max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] w-[155px] h-[155px] flex justify-center items-center"
              >
                Add Account
              </li>
            )}
          </ul>
        )}

        <Button
          onClick={() =>
            setIsDelete((prev) => !prev)
          }
          className="border bg-gray-500 cursor-pointer tracking-wide inline-flex text-sm px-[1.5rem] py-[0.5rem]"
        >
          Manage Profile
        </Button>

        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogContent>
            <DialogTitle className="visually-hidden">
              Profile Dialog
            </DialogTitle>
            <DialogDescription className="visually-hidden">
              {isAuth === "create"
                ? "Create a new account dialog"
                : "Login dialog"}
            </DialogDescription>

            {isAuth === "create" && (
              <CreateAccountForm
                uid={session?.user?.uid}
                setOpen={setOpen}
                setAccounts={setAccounts}
                accaounts={accounts}
              />
            )}
            {isAuth === "login" && (
              <Loginform
                curruntAcaunt={curruntAcaunt}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfileAcaunt;
