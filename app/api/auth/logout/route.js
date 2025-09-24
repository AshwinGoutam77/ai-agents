import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Clear auth-related cookies
    const res = NextResponse.json({ msg: "Logged out successfully" });

    res.cookies.set("auth_token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0), // Expired immediately
      path: "/",
    });

    res.cookies.set("user_email", "", {
      secure: true,
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}
