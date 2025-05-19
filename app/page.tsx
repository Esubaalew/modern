import { SearchForm } from "@/components/search-form"
import { WordOfTheDay } from "@/components/word-of-the-day"
import { RecentSearches } from "@/components/recent-searches"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Modern Dictionary</h1>
      <div className="max-w-3xl mx-auto">
        <SearchForm />
        <div className="mt-12 grid gap-8">
          <WordOfTheDay />
          <RecentSearches />
        </div>
      </div>
    </main>
  )
}
