"use client"
import { useIsClient } from "@/lib/hooks"
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from "@headlessui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const reviews = [
  { slug: "hades-2018", title: "Hades" },
  { slug: "fall-guys", title: "Fall Guys: Ultimate Knockout" },
  { slug: "disco-elysium", title: "Disco Elysium" },
  { slug: "dead-cells", title: "Dead Cells" },
  { slug: "a-way-out-2018", title: "A Way Out" }
]

export default function SearchBox() {
  const router = useRouter()
  const isClient = useIsClient()
  const [query, setQuery] = useState("")

  const handleChange = review => router.push(`/reviews/${review.slug}`)

  const filtered = reviews.filter(review => review.title.includes(query))

  if (!isClient) return null
  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <ComboboxInput
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
          className="border px-2 py-1 rounded w-full"
        />
        <ComboboxOptions className="absolute bg-white py-1 w-full">
          {filtered.map(review => (
            <ComboboxOption key={review.slug} value={review}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate w-full ${
                    active ? "bg-orange-100" : ""
                  }`}
                >
                  {review.title}
                </span>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}
