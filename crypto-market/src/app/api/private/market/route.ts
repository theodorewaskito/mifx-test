import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {

    const authorization = req.headers.get("authorization");

    const response = await fetch(
      "https://fe-technical-assignment.dxtr.asia/api/v1/list-crypto", 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(authorization ? { Authorization: authorization } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}