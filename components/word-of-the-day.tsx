"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { BritannicaWordOfTheDayDto } from "@/lib/types"
import { BookOpen } from "lucide-react"

export function WordOfTheDay() {
  const [wordData, setWordData] = useState<BritannicaWordOfTheDayDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getWordOfTheDay = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://britannica-clone.onrender.com/api/Dictionary/word-of-the-day`)

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()

        // Check if the response is empty or doesn't have the expected structure
        if (!data || Object.keys(data).length === 0 || !data.wordAndPos) {
          console.error("Invalid word of the day data:", data)
          setError("Word of the day data is not available")
          return
        }

        setWordData(data)
      } catch (err) {
        console.error("Failed to load word of the day:", err)
        setError("Failed to load word of the day")
      } finally {
        setIsLoading(false)
      }
    }

    getWordOfTheDay()
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <span className="block h-8 w-48 animate-pulse rounded-md bg-muted" />
          </CardTitle>
          <CardDescription>
            <span className="block h-4 w-32 animate-pulse rounded-md bg-muted" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <span className="block h-24 w-full animate-pulse rounded-md bg-muted" />
        </CardContent>
      </Card>
    )
  }

  if (error || !wordData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Word of the Day</CardTitle>
          <CardDescription>Couldn't load today's word</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">{error || "No data available. Please try again later."}</p>
        </CardContent>
      </Card>
    )
  }

  // Extract just the word from the wordAndPos format "Word (part of speech)"
  const word = wordData.wordAndPos.split(" (")[0]

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardTitle>Word of the Day</CardTitle>
        <CardDescription className="text-white/80">Expand your vocabulary</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            {wordData.image && wordData.image.src ? (
              <img
                src={wordData.image.src || "/placeholder.svg"}
                alt={wordData.image.alt || word}
                className="w-full md:w-32 h-auto rounded-md object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='8' fill='%23f1f5f9'/%3E%3Cpath d='M35 65v-30a5 5 0 0 1 5-5h25v40H40a5 5 0 0 1 0-10h25' stroke='%238b5cf6' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' fill='none'/%3E%3Cpath d='M45 40h15' stroke='%238b5cf6' strokeWidth='2' strokeLinecap='round'/%3E%3Cpath d='M45 50h20' stroke='%238b5cf6' strokeWidth='2' strokeLinecap='round'/%3E%3Cpath d='M45 60h15' stroke='%238b5cf6' strokeWidth='2' strokeLinecap='round'/%3E%3C/svg%3E"
                  e.currentTarget.alt = "Dictionary icon"
                }}
              />
            ) : (
              <div className="w-full md:w-32 h-32 rounded-md bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-purple-500 dark:text-purple-300" />
              </div>
            )}
          </div>
          <div>
            <Link href={`/search/${encodeURIComponent(word)}`}>
              <h3 className="text-2xl font-bold hover:text-purple-600 transition-colors">{wordData.wordAndPos}</h3>
            </Link>
            {wordData.meanings && wordData.meanings.length > 0 && (
              <div className="mt-2">
                <p className="text-gray-700 dark:text-gray-300">{wordData.meanings[0].definition}</p>
                {wordData.meanings[0].examples && wordData.meanings[0].examples.length > 0 && (
                  <p className="mt-2 text-gray-600 dark:text-gray-400 italic">"{wordData.meanings[0].examples[0]}"</p>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
