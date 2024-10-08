import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req.url);
  try {
    const response = await fetch(
      "https://api.api-ninjas.com/v1/quotes?category=success",
      {
        method: "GET",
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_QUOTE as string,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      return NextResponse.json({ data }, { status: response.status });
    } else {
      return NextResponse.json({ status: response.status });
    }
  } catch {
    return NextResponse.json({
      message: "Internal Server Error",
    });
  }
}
