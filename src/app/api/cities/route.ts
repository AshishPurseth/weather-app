import { NextResponse } from "next/server";
import { User } from "@/model/User";
import { connectToDatabase } from "@/lib/dbConnection";

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const { selectedOptions, sessionId } = await request.json();

    const cities = selectedOptions.map((option: { value: string }) => option.value);

    const user = await User.findById(sessionId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.cities = cities;
    await user.save();

    return NextResponse.json({ message: "Cities updated successfully", user });

  } catch (error) {
    console.error("Error updating user cities:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET(request: Request) {
    await connectToDatabase();
  
    try {
      const url = new URL(request.url);
    const sessionId = url.searchParams.get('sessionId');
  
    if (!sessionId) {
        return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }
    
    const user = await User.findById(sessionId);
    
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
      return NextResponse.json({ user });
  
    } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }