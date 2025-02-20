import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import PinInput from "react-pin-input";

const Loginform = () => {
  let [error, setError] =
    useState<boolean>(false);
  let [pin, setPin] = useState("");

  let [isLoading, setIsLoading] =
    useState<boolean>(false);

  function onSubmitLogin(value: string) {
    setIsLoading(true);
    console.log(value);
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
        <h2 className="text-white text-center font-bold text-[20px] ">
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
          onComplete={onSubmitLogin}
        />
        {isLoading && (
          <Loader2 className="animate-spin" />
        )}
      </div>
    </>
  );
};

export default Loginform;
