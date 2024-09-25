import { writeFileSync } from "node:fs"

const url = `http://localhost:4000/api/reviews?populate=*`
const response = await fetch(url)
const body = await response.json()
const formatted = JSON.stringify(body, null, 2)

const file = "scripts/strapi-response.json"
writeFileSync(file, formatted, "utf-8")
