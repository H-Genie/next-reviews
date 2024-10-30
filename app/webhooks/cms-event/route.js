import { NextResponse } from "next/server"

export const POST = async req => {
  const payload = await req.json()
  console.log(payload)

  return new Response(null, { status: 204 })
}
