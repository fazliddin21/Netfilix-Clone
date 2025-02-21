import { NextResponse } from "next/server";
import { ConnectDataBase } from "@/lib/mongouse";
import Account from "../../../../../database/account";
import { compare } from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await ConnectDataBase();

    // 🔥 Request body dan kelayotgan ma'lumotlarni to'g'ri olish
    const { accountId, pin, uid } =
      await req.json();
    console.log("📩 Kelgan ma'lumot:", {
      accountId,
      pin,
      uid,
    });

    // 🔥 Foydalanuvchini tekshiramiz
    let currentAcaunt = await Account.findOne({
      _id: accountId,
      uid,
    });
    if (!currentAcaunt) {
      console.log("❌ Account topilmadi!");
      return NextResponse.json({
        success: false,
        message: "Account not found",
      });
    }

    // 🔥 PIN hashini va kiritilgan PIN ni tekshiramiz
    console.log(
      "🔑 DB dan PIN:",
      currentAcaunt.pin
    );
    console.log("🔢 Kiritilgan PIN:", pin);

    let isMatch = await compare(
      pin,
      currentAcaunt.pin
    );
    console.log("✅ PIN mos keldi:", isMatch);

    if (isMatch) {
      return NextResponse.json({
        success: true,
        data: currentAcaunt,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Pin not match",
      });
    }
  } catch (error) {
    console.error("🚨 Xatolik:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
