"use client"
import { useIsClient } from "@/lib/hooks"
import { searchReview } from "@/lib/review"
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions
} from "@headlessui/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SearchBox() {
  const router = useRouter()
  const isClient = useIsClient()
  const [query, setQuery] = useState("")
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (query.length > 1) {
      const controller = new AbortController()
      ;(async () => {
        const response = await fetch(
          "/api/search?query=" + encodeURIComponent(query)
        )
        const reviews = await response.json()
        setReviews(reviews)
      })()
      return () => controller.abort()
    } else {
      setReviews([])
    }
  }, [query])

  const handleChange = review => {
    if (review) {
      router.push(`/reviews/${review.slug}`)
    } else {
      return null
    }
  }

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
          {reviews.map(review => (
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
