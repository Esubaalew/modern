"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchContext } from "@/context/search-context"

interface SearchFormProps {
  initialValue?: string
}

export function SearchForm({ initialValue = "" }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue)
  const router = useRouter()
  const { addRecentSearch } = useSearchContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchTerm.trim()) return

    const word = searchTerm.trim().toLowerCase()
    addRecentSearch(word)
    router.push(`/search/${encodeURIComponent(word)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        type="text"
        placeholder="Search for a word..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-4 pr-12 py-6 text-lg rounded-full shadow-md"
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-10 w-10"
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}
