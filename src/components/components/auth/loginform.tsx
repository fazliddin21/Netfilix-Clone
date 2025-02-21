"use client";
import { useGlobalContext } from "@/context/context";
import { toast } from "@/hooks/use-toast";
import {
  AccountProps,
  AxiosType,
} from "@/types/main";
import axios from "axios";
import { Loader2 } from "lucide-react";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import React, { useState } from "react";
import PinInput from "react-pin-input";

interface CurruntT {
  curruntAcaunt: AccountProps | null;
}

const Loginform = ({
  curruntAcaunt,
}: CurruntT) => {
  let [error, setError] =
    useState<boolean>(false);
  let [pin, setPin] = useState("");
  let [isLoading, setIsLoading] =
    useState<boolean>(false);

  let pathName = usePathname();
  const router = useRouter();
  let { setAccount } = useGlobalContext();

  async function onSubmitLogin(value: string) {
    console.log("🔹 PIN kod terildi:", value);
    setIsLoading(true);

    if (!curruntAcaunt) {
      console.error(
        "❌ Account ma'lumotlari yo‘q!"
      );
      toast({
        title: "Error",
        description:
          "Account ma'lumotlari topilmadi",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      console.log(
        "📡 API ga so‘rov yuborilmoqda..."
      );
      let { data } = await axios.post<AxiosType>(
        `/api/account/login`,
        {
          uid: curruntAcaunt?.uid,
          accountId: curruntAcaunt?._id, // ✅ accauntId emas!
          pin: value,
        }
      );
      console.log("✅ API javobi:", data);

      if (data.success) {
        setAccount(data.data as AccountProps);
        sessionStorage.setItem(
          "account",
          JSON.stringify(data.data)
        );
        router.push(pathName);
        toast({
          title: "Success",
          description:
            "You have successfully logged in to your account",
        });
      } else {
        console.error("❌ PIN noto‘g‘ri!");
        setError(true);
        toast({
          title: "Error",
          description:
            "Parol noto'g'ri kiritildi",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(
        "⚠️ API so‘rovda xatolik:",
        error
      );
      toast({
        title: "Error",
        description: "Tizimda xatolik yuz berdi",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-[16px] text-gray-400 font-bold mb-4">
        Profile Lock is currently ON
      </h2>
      {error ? (
        <h2 className="text-red-500 text-center font-bold text-[20px]">
          Whoops, wrong PIN. Please try again
        </h2>
      ) : (
        <h2 className="text-white text-center font-bold text-[20px]">
          Enter your PIN to access this profile
        </h2>
      )}
      <div className="flex justify-center items-center">
        <PinInput
          length={4}
          initialValue={pin}
          secret
          secretDelay={100}
          onChange={(value) => setPin(value)}
          onComplete={(value) => {
            console.log(
              "✅ PIN to‘liq terildi:",
              value
            );
            onSubmitLogin(value);
          }}
          type={"numeric"}
          inputMode={"number"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
          inputStyle={{
            borderColor:
              "RGBA(255, 255, 255, 0.16)",
            height: "56px",
            width: "100%",
            fontSize: "40px",
          }}
          inputFocusStyle={{
            borderColor:
              "RGBA(255, 255, 255, 0.80)",
          }}
          autoSelect={true}
          disabled={isLoading}
        />
        {isLoading && (
          <Loader2 className="animate-spin" />
        )}
      </div>
    </>
  );
};

export default Loginform;
