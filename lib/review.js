import { readdir, readFile } from "node:fs/promises"
import matter from "gray-matter"
import { marked } from "marked"

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
  const slugs = await getSlugs()
  const reviews = []
  for (const slug of slugs) {
    const review = await getReview(slug)
    reviews.push(review)
  }
  return reviews
}

export const getSlugs = async () => {
  const files = await readdir("./content/reviews")
  return files
    .filter(file => file.endsWith(".md"))
    .map(file => file.slice(0, -".md".length))
}
