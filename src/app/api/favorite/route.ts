import { ConnectDataBase } from "@/lib/mongouse";
import { Favoritetype } from "@/types/main";
import axios from "axios";
import { NextResponse } from "next/server";
import Favorite from "../../../../database/favotire";

export const dynamic = "force-dynamic";


export async function POST(req: Request) {
    try {
        await ConnectDataBase()
        const body: Favoritetype = await req.json();
        const { uid, accountId, backdrop_path, poster_path, type, movieId } = body;

        const isExsit = await Favorite.findOne({ uid, movieId, accountId })

        if (isExsit) {
            return NextResponse.json({ success: false, messege: "This movie is already in your favorite list" })
        }
        const newFavorite = Favorite.create(body)

        return NextResponse.json({ success: true, data: newFavorite })
    } catch (error) {
        return NextResponse.json({ success: false, messege: "Something went wrong" })
    }
}

export async function GET(req: Request) {
    try {
        await ConnectDataBase()

        const { searchParams } = new URL(req.url)
        const uid = searchParams.get("uid")
        const accountId = searchParams.get("accountId")

        const favourites = await Favorite.find({ uid, accountId })

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

        await Favorite.findByIdAndDelete(id)

        return NextResponse.json({ success: true, data: "Successfully deleted" })
    } catch (e) {
        return NextResponse.json({ success: false, message: "Something went wrong" })
    }
}