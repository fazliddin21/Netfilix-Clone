import { NextResponse } from "next/server";
import Favourite from "../../../../database/favotire";
import { ConnectDataBase } from "@/lib/mongouse";
import { Favoritetype } from "@/types/main";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        await ConnectDataBase();

        const body: Favoritetype = await req.json();

        const { uid, accountId, movieId } = body;

        const isExist = await Favourite.findOne({ uid, movieId, accountId });

        if (isExist) {
            return NextResponse.json({ success: false, message: "Already added to favourites" })
        }

        const favourite = await Favourite.create(body);

        return NextResponse.json({ success: true, data: favourite })
    } catch (e) {
        return NextResponse.json({ success: false, message: "Something went wrong" })
    }
}

export async function GET(req: Request) {
    try {
        await ConnectDataBase()

        const { searchParams } = new URL(req.url)
        const uid = searchParams.get("uid")
        const accountId = searchParams.get("accountId")

        const favourites = await Favourite.find({ uid, accountId })

        return NextResponse.json({ success: true, data: favourites })
    } catch (e) {
        return NextResponse.json({ success: false, message: "Something went wrong" })
    }
}

export async function DELETE(req: Request) {
    try {
        await ConnectDataBase()

        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        await Favourite.findByIdAndDelete(id)

        return NextResponse.json({ success: true, data: "Successfully deleted" })
    } catch (e) {
        return NextResponse.json({ success: false, message: "Something went wrong" })
    }
}