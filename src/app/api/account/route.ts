import { ConnectDataBase } from "@/lib/mongouse";
import { NextResponse } from "next/server";
import Account from "../../../../database/account";

import { hash } from "bcryptjs";
export const dynamic = "force-dynamic";

// POST ACCAUNTS POSTMAN
export const POST = async (req: Request) => {
  try {
    await ConnectDataBase();
    const { name, uid, pin } = await req.json();

    let isExsist = await Account.findOne({
      name,
    });
    let allAcaount = await Account.find({ uid });
    console.log(allAcaount);
    console.log(isExsist);

    if (isExsist) {
      return NextResponse.json({
        success: false,
        message:
          "Bunday foydalanuvchi allaqachon mavjud!",
      });
    }

    if (allAcaount && allAcaount.length === 4) {
      return NextResponse.json({
        success: false,
        message:
          "Siz faqat 4ta account kitrita olasiz!",
      });
    }
    let HashPin = await hash(pin, 10);
    console.log(HashPin);

    let account = await Account.create({
      name,
      pin: HashPin,
      uid,
    });

    return NextResponse.json({
      success: true,
      data: account,
    });
  } catch (error) {
    console.error("Xatolik:", error);
    return NextResponse.json({
      success: false,
      message: "Serverda xatolik yuz berdi",
    });
  }
};
//  GET ACCAUNTS POSTMAN
export let GET = async (req: Request) => {
  try {
    await ConnectDataBase();
    let { searchParams } = new URL(req.url);
    let uid = searchParams.get("uid");
    if (!uid) {
      return NextResponse.json({
        success: false,
        messege: "Accaunt id not wound",
      });
    }
    let accaunts = await Account.find({ uid });

    return NextResponse.json({
      success: true,
      data: accaunts,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      messege: "bundey id raqam topilmadi",
    });
  }
};

// DELETE ACCAUNTC POSTMAN

export async function DELETE(req: Request) {
  try {
    await ConnectDataBase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Account id is mandatory",
      });
    }
    await Account.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
