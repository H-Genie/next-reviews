"use client"
import { useIsClient } from "@/lib/hooks"
import { Combobox, ComboboxInput } from "@headlessui/react"

export default function SearchBox() {
  const isClient = useIsClient()

  if (!isClient) return null
  return (
    <Combobox>
      <ComboboxInput placeholder="Search..." />
    </Combobox>
  )
}
