import { readdir, readFile } from "node:fs/promises"
import matter from "gray-matter"
import { marked } from "marked"
import qs from "qs"

export const getFeaturedReview = async () => {
  const reviews = await getReviews()
  return reviews[0]
}

export const getReview = async slug => {
  const text = await readFile(`./content/reviews/${slug}.md`, "utf-8")
  const {
    content,
    data: { title, date, image }
  } = matter(text)
  const body = marked(content, { headerIds: false, mangle: false })
  return { slug, title, date, image, body }
}

export const getReviews = async () => {
  const url =
    `http://localhost:4000/api/reviews?` +
    qs.stringify(
      {
        fields: ["slug", "title", "subtitle", "publishedAt"],
        populate: { image: { fields: ["url"] } },
        sort: ["publishedAt:desc"],
        pagination: { pageSize: 6 }
      },
      { encodeValuesOnly: true }
    )
  const response = await fetch(url)
  const { data } = await response.json()
  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title
  }))
}

export const getSlugs = async () => {
  const files = await readdir("./content/reviews")
  return files
    .filter(file => file.endsWith(".md"))
    .map(file => file.slice(0, -".md".length))
}
