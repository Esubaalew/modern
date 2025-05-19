import type { BritannicaDefinitionDto, BritannicaWordOfTheDayDto, MerriamWebsterResultDto } from "./types"

const API_BASE_URL = "https://da.esubalew.et/api/Dictionary"

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API error (${response.status}): ${errorText}`)
  }
  return response.json() as Promise<T>
}

// Fetch entries for a word
export async function fetchEntries(word: string) {
  const response = await fetch(`${API_BASE_URL}/entries/${encodeURIComponent(word)}`)
  return handleResponse<{ Text: string; Link: string }[]>(response)
}

// Fetch total entries for a word
export async function fetchTotalEntries(word: string) {
  const response = await fetch(`${API_BASE_URL}/total-entries/${encodeURIComponent(word)}`)
  return handleResponse<{ TotalEntries: number }>(response)
}

// Fetch word of the day
export async function fetchWordOfTheDay() {
  try {
    const response = await fetch(`${API_BASE_URL}/word-of-the-day`)

    if (!response.ok) {
      throw new Error(`API error (${response.status})`)
    }

    const data = await response.json()

    // Validate the response has the expected structure
    if (!data || Object.keys(data).length === 0 || !data.wordAndPos) {
      console.error("Invalid word of the day data:", data)
      throw new Error("Invalid word of the day data")
    }

    return data as BritannicaWordOfTheDayDto
  } catch (error) {
    console.error("Error fetching word of the day:", error)
    throw error
  }
}

// Fetch parts of speech for a word
export async function fetchPartsOfSpeech(word: string) {
  const response = await fetch(`${API_BASE_URL}/parts-of-speech/${encodeURIComponent(word)}`)
  return handleResponse<string[]>(response)
}

// Fetch definitions for a word
export async function fetchDefinitions(word: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/definitions/${encodeURIComponent(word)}`)
    if (!response.ok) {
      throw new Error(`API error (${response.status})`)
    }

    const data = await response.json()
    console.log("Britannica definitions raw data:", data)

    return data as BritannicaDefinitionDto[]
  } catch (error) {
    console.error("Error fetching definitions:", error)
    throw error
  }
}

// Fetch Merriam-Webster data for a word
export async function fetchMerriamData(word: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/merriam/${encodeURIComponent(word)}`)
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      const errorText = await response.text()
      throw new Error(`API error (${response.status}): ${errorText}`)
    }

    const data = await response.json()
    console.log("Merriam-Webster raw data:", data)

    return data as MerriamWebsterResultDto
  } catch (error) {
    console.error("Error fetching Merriam-Webster data:", error)
    throw error
  }
}
