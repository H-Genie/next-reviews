import { readdir } from "node:fs/promises"
import { marked } from "marked"
import qs from "qs"

const CMS_URL = "http://localhost:4000"

export const getFeaturedReview = async () => {
  const reviews = await getReviews()
  return reviews[0]
}

export const getReview = async slug => {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false }
  })
  const item = data[0]
  return {
    ...toReview(item),
    body: marked(item.attributes.body, { headerIds: false, mangle: false })
  }
}

export const getReviews = async () => {
  const { data } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 25 }
  })
  return data.map(toReview)
}

export const getSlugs = async () => {
  const files = await readdir("./content/reviews")
  return files
    .filter(file => file.endsWith(".md"))
    .map(file => file.slice(0, -".md".length))
}

const fetchReviews = async parameters => {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(parameters, { encodeValuesOnly: true })
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`CMs returned ${response.status} or ${url}`)
  }
  return await response.json()
}

const toReview = item => {
  const { attributes } = item
  return {
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: CMS_URL + attributes.image.data.attributes.url
  }
}
