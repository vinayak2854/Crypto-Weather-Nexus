import { NextResponse } from "next/server";

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const OPENWEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

export async function GET(request) {
  try {
    if (!OPENWEATHER_API_KEY) {
      return NextResponse.json(
        { error: "OpenWeather API key is not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const city = searchParams.get("q");
    const units = searchParams.get("units") || "metric";

    if (!city) {
      return NextResponse.json(
        { error: "City parameter is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${OPENWEATHER_API_URL}/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=${units}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch weather data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
