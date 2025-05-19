"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface SearchContextType {
  recentSearches: string[]
  addRecentSearch: (search: string) => void
  removeRecentSearch: (search: string) => void
  clearRecentSearches: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

interface SearchProviderProps {
  children: ReactNode
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches))
      } catch (error) {
        console.error("Failed to parse recent searches:", error)
      }
    }
  }, [])

  // Save recent searches to localStorage when they change
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
  }, [recentSearches])

  const addRecentSearch = (search: string) => {
    setRecentSearches((prev) => {
      // Remove the search if it already exists
      const filtered = prev.filter((s) => s !== search)
      // Add the search to the beginning of the array
      return [search, ...filtered].slice(0, 10) // Keep only the 10 most recent searches
    })
  }

  const removeRecentSearch = (search: string) => {
    setRecentSearches((prev) => prev.filter((s) => s !== search))
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
  }

  return (
    <SearchContext.Provider
      value={{
        recentSearches,
        addRecentSearch,
        removeRecentSearch,
        clearRecentSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchContext() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider")
  }
  return context
}
