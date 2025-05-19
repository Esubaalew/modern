import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NotFoundIllustration } from "@/components/illustrations/not-found-illustration"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-full max-w-md mb-8">
        <NotFoundIllustration />
      </div>
      <h2 className="text-2xl font-semibold mb-4">Word Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Sorry, we couldn't find the word you're looking for. It might be misspelled or not in our dictionary.
      </p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}
