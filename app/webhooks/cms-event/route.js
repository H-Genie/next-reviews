import { CACHE_TAG_REVIEWS } from "@/lib/review"
import { revalidateTag } from "next/cache"

export const POST = async req => {
  const payload = await req.json()
  if (payload.mode === "review") {
    revalidateTag(CACHE_TAG_REVIEWS)
  }

  return new Response(null, { status: 204 })
}
