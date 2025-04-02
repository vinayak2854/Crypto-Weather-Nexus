import { NextResponse } from "next/server";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const NEWS_API_URL = "https://newsapi.org/v2";

export async function GET() {
  try {
    if (!NEWS_API_KEY) {
      return NextResponse.json(
        { error: "News API key is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${NEWS_API_URL}/everything?q=cryptocurrency&apiKey=${NEWS_API_KEY}&language=en&pageSize=5`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch news" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news data" },
      { status: 500 }
    );
  }
}
