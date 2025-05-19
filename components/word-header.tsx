"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchPartsOfSpeech } from "@/lib/api"
import { Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WordHeaderProps {
  word: string
}

export function WordHeader({ word }: WordHeaderProps) {
  const [partsOfSpeech, setPartsOfSpeech] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const getPartsOfSpeech = async () => {
      try {
        setIsLoading(true)
        const data = await fetchPartsOfSpeech(word)
        setPartsOfSpeech(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    getPartsOfSpeech()
  }, [word])

  // Try to get audio URL from Merriam-Webster API response
  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await fetch(`https://britannica-clone.onrender.com/api/Dictionary/merriam/${word}`)
        if (response.ok) {
          const data = await response.json()
          if (data.Entries && data.Entries.length > 0) {
            const entry = data.Entries[0]
            if (entry.AudioFileKey && entry.AudioDirectory) {
              // Construct audio URL based on Merriam-Webster format
              const audioUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${entry.AudioDirectory}/${entry.AudioFileKey}.mp3`
              setAudioUrl(audioUrl)

              // Preload audio
              const audio = new Audio(audioUrl)
              audioRef[1](audio)
            }
          }
        }
      } catch (error) {
        console.error("Error fetching audio:", error)
      }
    }

    fetchAudio()
  }, [word])

  const playAudio = () => {
    if (audioRef[0] && !isPlaying) {
      setIsPlaying(true)
      audioRef[0].play()
      audioRef[0].onended = () => setIsPlaying(false)
    }
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <h1 className="text-4xl font-bold">{word}</h1>
        {audioUrl && (
          <Button variant="outline" size="icon" className="rounded-full" onClick={playAudio} disabled={isPlaying}>
            <Volume2 className={`h-5 w-5 ${isPlaying ? "text-purple-500" : ""}`} />
            <span className="sr-only">Pronounce {word}</span>
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="mt-2">
          <Skeleton className="h-5 w-32" />
        </div>
      ) : (
        <div className="mt-2 flex flex-wrap gap-2">
          {partsOfSpeech.map((pos, index) => (
            <span
              key={index}
              className="text-sm px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-md"
            >
              {pos}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
