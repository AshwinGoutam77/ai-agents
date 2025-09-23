import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "../../../../lib/db";
import { generateToken } from "../../../../lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("aiAgent");
    const users = db.collection("users");

    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken({ _id: user._id, email: user.email });

    return NextResponse.json(
      { token, user: { id: user._id, name: user.name, email: user.email } },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}
