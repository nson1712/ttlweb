import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LSK_DEVICE_ID } from "@/app/utils/storage";

export async function POST(req: Request) {
  const { deviceId } = await req.json();
  (await cookies()).set({
    name: LSK_DEVICE_ID,
    value: deviceId,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return NextResponse.json({ success: true });
}

export async function GET() {
  const deviceId = (await cookies()).get(LSK_DEVICE_ID)?.value ?? "";
  // this console.log goes to your Next.js server logs, not browser console!
  console.log("📦 device-id in cookie:", deviceId);
  return NextResponse.json({ deviceId });
}