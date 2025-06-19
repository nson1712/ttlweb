import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Next.js sẽ normalize tất cả headers về lowercase
  const deviceId = request.headers.get("deviceid");

  if (!deviceId) {
    return NextResponse.json(
      { error: "Missing deviceId header" },
      { status: 400 }
    );
  }


  // Lấy page/size từ query string
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "0";
  const size = searchParams.get("size") ?? "20";
  // … xử lý sort/filter tương tự

  // Ví dụ trả data dummy
  const data = {
    stories: [], 
    page: Number(page),
    pageSize: Number(size),
    // …
  };

  return NextResponse.json({ deviceId, ...data });
}