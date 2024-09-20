import Link from "next/link"
import Heading from "@/components/Heading"
import { getReviews } from "@/lib/review"

export const metadata = {
  title: "Reviews"
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map(review => (
          <li
            className="bg-white border shadow rounded w-80 hover:shadow-xl"
            key={review.slug}
          >
            <Link href={`/reviews/${review.slug}`}>
              <img
                src={review.image}
                alt=""
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
