import { searchReview } from "@/lib/review"
import { NextResponse } from "next/server"

export async function GET(req) {
  const query = req.nextUrl.searchParams.get("query")
  const reviews = await searchReview(query)
  return NextResponse.json(reviews)
}
