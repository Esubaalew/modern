"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchContext } from "@/context/search-context"
import { Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RecentSearches() {
  const { recentSearches, removeRecentSearch, clearRecentSearches } = useSearchContext()

  if (recentSearches.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Searches
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={clearRecentSearches} className="text-sm">
          Clear All
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-wrap gap-2">
          {recentSearches.map((search) => (
            <li key={search} className="group relative">
              <Link
                href={`/search/${encodeURIComponent(search)}`}
                className="inline-block px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-sm transition-colors pr-8"
              >
                {search}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 absolute right-1 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100"
                onClick={(e) => {
                  e.preventDefault()
                  removeRecentSearch(search)
                }}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {search}</span>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
