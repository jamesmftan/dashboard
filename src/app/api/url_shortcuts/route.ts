import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req.url);
  try {
    const response = await fetch(process.env.URL_SHORTCUTS!, {
      method: "GET",
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

export async function POST(req: NextRequest) {
  try {
    const { name, url } = await req.json();
    const response = await fetch(process.env.URL_SHORTCUTS!, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        url: url,
      }),
    });
    if (response.ok) {
      return NextResponse.json(
        { message: "URL created" },
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

export async function PUT(req: NextRequest) {
  try {
    const { id, name, url } = await req.json();
    const response = await fetch(`${process.env.URL_SHORTCUTS!}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        url: url,
      }),
    });
    if (response.ok) {
      return NextResponse.json(
        { message: "URL Updated" },
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

export async function DELETE(req: NextRequest) {
  try {
    const { id, name, url } = await req.json();
    const response = await fetch(`${process.env.URL_SHORTCUTS!}/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        name: name,
        url: url,
      }),
    });

    if (response.ok) {
      return NextResponse.json(
        { message: "URL DELETED" },
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
