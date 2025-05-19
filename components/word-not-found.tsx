import { Card, CardContent } from "@/components/ui/card"
import { NotFoundIllustration } from "@/components/illustrations/not-found-illustration"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface WordNotFoundProps {
  word: string
}

export function WordNotFound({ word }: WordNotFoundProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-full max-w-xs mb-6">
            <NotFoundIllustration />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Definitions Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't find any definitions for "<span className="font-medium">{word}</span>". It might be misspelled
            or not in our dictionary.
          </p>
          <Button asChild>
            <Link href="/">Try Another Word</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
