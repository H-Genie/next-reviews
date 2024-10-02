import Heading from "@/components/Heading"
import ShareButton from "@/components/ShareButton"
import { getReview, getSlugs } from "@/lib/review"

// export const generateStaticParams = async () => {
//   const slugs = await getSlugs()
//   return slugs.map(slug => ({ slug }))
// }

export const generateMetadata = async ({ params: { slug } }) => {
  const review = await getReview(slug)
  return {
    title: review.title
  }
}

export default async function ReviewPage({ params: { slug } }) {
  const review = await getReview(slug)

  return (
    <>
      <Heading>{review.title}</Heading>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareButton />
      </div>
      <img
        src={review.image}
        alt=""
        width={640}
        height={360}
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="max-w-screen-sm prose prose-slate"
      />
    </>
  )
}
