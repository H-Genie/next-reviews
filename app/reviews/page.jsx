import Link from "next/link"
import Heading from "@/components/Heading"
import { getReviews } from "@/lib/review"
import Image from "next/image"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Reviews"
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review, index) => (
          <li
            className="bg-white border shadow rounded w-80 hover:shadow-xl"
            key={review.slug}
          >
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                alt=""
                priority={index === 0}
                width={320}
                height={180}
                className="rounded-t"
              />
              <h2 className="font-semibold font-orbitron py-1 text-center">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
