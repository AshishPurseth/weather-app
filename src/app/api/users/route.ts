
import { NextResponse } from "next/server";
import { User } from "@/model/User";
import { connectToDatabase } from "@/lib/dbConnection";

export async function POST(request: Request) {
  await connectToDatabase();

  const { username } = await request.json();

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  const result = await User.findOne({ username });
  if (!result) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(result);
}
