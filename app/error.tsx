"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ErrorIllustration } from "@/components/illustrations/error-illustration"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-full max-w-md mb-8">
        <ErrorIllustration />
      </div>
      <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        We encountered an error while processing your request. Please try again or return to the home page.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} variant="outline">
          Try again
        </Button>
        <Button asChild>
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  )
}
