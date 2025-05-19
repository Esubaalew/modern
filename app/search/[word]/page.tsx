import { Suspense } from "react"
import { notFound } from "next/navigation"
import { SearchForm } from "@/components/search-form"
import { WordDefinitions } from "@/components/word-definitions"
import { WordHeader } from "@/components/word-header"
import { LoadingDefinitions } from "@/components/loading-definitions"
import { ErrorBoundary } from "@/components/error-boundary"

interface SearchPageProps {
  params: {
    word: string
  }
}

export default function SearchPage({ params }: SearchPageProps) {
  const word = decodeURIComponent(params.word)

  if (!word) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <SearchForm initialValue={word} />

        <div className="mt-8">
          <WordHeader word={word} />

          <ErrorBoundary
            fallback={<div className="p-8 text-center">Something went wrong loading the definitions.</div>}
          >
            <Suspense fallback={<LoadingDefinitions />}>
              <WordDefinitions word={word} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </main>
  )
}
