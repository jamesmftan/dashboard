import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req.url);
  try {
    const response = await fetch(process.env.SETTINGS as string, {
      method: "GET",
      headers: {
        "Api-Key": process.env.DATA_API_KEY as string,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return NextResponse.json({ data }, { status: response.status });
    } else {
      return NextResponse.json({ status: response.status });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { username, background_image, background_intensity, theme } =
      await req.json();
    const response = await fetch(process.env.SETTINGS as string, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Api-Key": process.env.DATA_API_KEY as string,
      },
      body: JSON.stringify({
        username,
        background_image,
        background_intensity,
        theme,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      return NextResponse.json(
        { data, message: "URL Updated" },
        { status: response.status }
      );
    } else {
      return NextResponse.json({ status: response.status });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
    });
  }
}
