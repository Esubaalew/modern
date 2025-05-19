"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchDefinitions, fetchMerriamData } from "@/lib/api"
import type { BritannicaDefinitionDto, MerriamWebsterResultDto } from "@/lib/types"
import { AlertCircle, ChevronDown, ExternalLink } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingDefinitions } from "@/components/loading-definitions"
import { WordNotFound } from "@/components/word-not-found"

interface WordDefinitionsProps {
  word: string
}

export function WordDefinitions({ word }: WordDefinitionsProps) {
  const [britannicaDefinitions, setBritannicaDefinitions] = useState<BritannicaDefinitionDto[]>([])
  const [merriamData, setMerriamData] = useState<MerriamWebsterResultDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedExamples, setExpandedExamples] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch data from both sources in parallel
        const [britannicaData, merriamWebsterData] = await Promise.all([fetchDefinitions(word), fetchMerriamData(word)])

        console.log("Britannica data:", britannicaData)
        console.log("Merriam-Webster data:", merriamWebsterData)

        setBritannicaDefinitions(britannicaData)
        setMerriamData(merriamWebsterData)

        // Check if we have any definitions
        if (
          britannicaData.length === 0 &&
          (!merriamWebsterData || !merriamWebsterData.entries || merriamWebsterData.entries.length === 0)
        ) {
          setError(`No definitions found for "${word}".`)
        }
      } catch (err) {
        console.error(err)
        setError(`Failed to load definitions for "${word}".`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [word])

  const toggleExamples = (id: string) => {
    setExpandedExamples((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (isLoading) {
    return <LoadingDefinitions />
  }

  if (error) {
    if (error.includes("No definitions found")) {
      return <WordNotFound word={word} />
    }

    return (
      <Alert variant="destructive" className="my-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="mt-8">
      <Tabs defaultValue="side-by-side" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
          <TabsTrigger value="britannica">Britannica</TabsTrigger>
          <TabsTrigger value="merriam">Merriam-Webster</TabsTrigger>
        </TabsList>

        <TabsContent value="side-by-side" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Britannica</h2>
              {britannicaDefinitions && britannicaDefinitions.length > 0 ? (
                <div className="space-y-4">
                  {britannicaDefinitions.map((def, index) => (
                    <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                      <CardHeader className="bg-purple-50 dark:bg-purple-900/20 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/50">
                              {index + 1}
                            </Badge>
                            <span className="line-clamp-1">{def.meaning}</span>
                          </CardTitle>
                          {def.examples && def.examples.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => toggleExamples(`brit-${index}`)}
                            >
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${expandedExamples[`brit-${index}`] ? "rotate-180" : ""}`}
                              />
                              <span className="sr-only">Toggle examples</span>
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-gray-800 dark:text-gray-200">{def.meaning}</p>

                        {def.examples && def.examples.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Examples:</h4>
                            <ul className="space-y-2">
                              {def.examples.slice(0, 3).map((example, i) => {
                                // Clean up the example text by removing extra whitespace and newlines
                                const cleanExample = example.replace(/\s+/g, " ").trim()
                                return (
                                  <li
                                    key={i}
                                    className="text-gray-600 dark:text-gray-400 italic pl-3 border-l-2 border-purple-200 dark:border-purple-800"
                                  >
                                    "{cleanExample}"
                                  </li>
                                )
                              })}
                              {def.examples.length > 3 && (
                                <div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-7 mt-1"
                                    onClick={() => toggleExamples(`brit-${index}`)}
                                  >
                                    {expandedExamples[`brit-${index}`]
                                      ? "Hide"
                                      : `Show ${def.examples.length - 3} more`}{" "}
                                    examples
                                    <ChevronDown
                                      className={`h-3 w-3 ml-1 transition-transform duration-200 ${expandedExamples[`brit-${index}`] ? "rotate-180" : ""}`}
                                    />
                                  </Button>

                                  {expandedExamples[`brit-${index}`] && (
                                    <ul className="space-y-2 mt-2">
                                      {def.examples.slice(3).map((example, i) => {
                                        // Clean up the example text by removing extra whitespace and newlines
                                        const cleanExample = example.replace(/\s+/g, " ").trim()
                                        return (
                                          <li
                                            key={i + 3}
                                            className="text-gray-600 dark:text-gray-400 italic pl-3 border-l-2 border-purple-200 dark:border-purple-800"
                                          >
                                            "{cleanExample}"
                                          </li>
                                        )
                                      })}
                                    </ul>
                                  )}
                                </div>
                              )}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-500">No Britannica definitions available for this word.</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Merriam-Webster</h2>
              {merriamData && merriamData.entries && merriamData.entries.length > 0 ? (
                <div className="space-y-6">
                  {merriamData.entries.map((entry, entryIndex) => (
                    <Card key={entryIndex} className="overflow-hidden transition-all hover:shadow-md">
                      <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                        <div className="flex items-center gap-2">
                          <CardTitle>
                            {entry.headword}
                            {entry.entryNumber && (
                              <span className="text-sm text-gray-500 ml-1">({entry.entryNumber})</span>
                            )}
                          </CardTitle>
                          {entry.partOfSpeech && entry.partOfSpeech !== "unknown" && (
                            <Badge variant="outline" className="text-xs">
                              {entry.partOfSpeech}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center justify-between">
                          <span>{entry.pronunciation && <span className="italic">[{entry.pronunciation}]</span>}</span>
                          <a
                            href={`https://britannica-clone.onrender.com/api/Dictionary/merriam/${word}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs flex items-center gap-1 text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            View API <ExternalLink className="h-3 w-3" />
                          </a>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        {entry.senses && entry.senses.length > 0 ? (
                          <div className="space-y-6">
                            {entry.senses.map((sense, senseIndex) => (
                              <div key={senseIndex} className="flex items-start gap-2">
                                <div className="flex-shrink-0 w-6 text-center">
                                  {sense.senseIndicator && (
                                    <span className="font-medium text-gray-500">{sense.senseIndicator}</span>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="text-gray-800 dark:text-gray-200">
                                    {/* Clean up definition text by removing extra whitespace and newlines */}
                                    {sense.definitionText.replace(/\s+/g, " ").trim()}
                                  </p>

                                  {sense.verbalIllustrations && sense.verbalIllustrations.length > 0 && (
                                    <div className="mt-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs h-7"
                                        onClick={() => toggleExamples(`merriam-${entryIndex}-${senseIndex}`)}
                                      >
                                        {expandedExamples[`merriam-${entryIndex}-${senseIndex}`] ? "Hide" : "Show"}{" "}
                                        {sense.verbalIllustrations.length} example
                                        {sense.verbalIllustrations.length > 1 ? "s" : ""}
                                        <ChevronDown
                                          className={`h-3 w-3 ml-1 transition-transform duration-200 ${expandedExamples[`merriam-${entryIndex}-${senseIndex}`] ? "rotate-180" : ""}`}
                                        />
                                      </Button>

                                      {expandedExamples[`merriam-${entryIndex}-${senseIndex}`] && (
                                        <ul className="mt-2 space-y-1">
                                          {sense.verbalIllustrations.map((example, i) => {
                                            // Clean up the example text
                                            const cleanExample = example.replace(/\s+/g, " ").trim()
                                            return (
                                              <li
                                                key={i}
                                                className="text-gray-600 dark:text-gray-400 italic pl-3 border-l-2 border-blue-200 dark:border-blue-800"
                                              >
                                                "{cleanExample}"
                                              </li>
                                            )
                                          })}
                                        </ul>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No definitions available.</p>
                        )}

                        {entry.inflections && entry.inflections.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Inflections:</h4>
                            <p className="text-gray-700 dark:text-gray-300">{entry.inflections.join(", ")}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {merriamData.etymology &&
                    merriamData.etymology.paragraphs &&
                    merriamData.etymology.paragraphs.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Etymology</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {merriamData.etymology.paragraphs.map((para, i) => (
                            <p key={i} className="text-gray-700 dark:text-gray-300 mb-2">
                              {para}
                            </p>
                          ))}
                        </CardContent>
                      </Card>
                    )}

                  {merriamData.firstKnownUse && (
                    <Card>
                      <CardHeader>
                        <CardTitle>First Known Use</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 dark:text-gray-300">{merriamData.firstKnownUse}</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-500">No Merriam-Webster definitions available for this word.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="britannica" className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Britannica</h2>
          {britannicaDefinitions && britannicaDefinitions.length > 0 ? (
            <div className="space-y-4">
              {britannicaDefinitions.map((def, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="bg-purple-50 dark:bg-purple-900/20 pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900/50">
                          {index + 1}
                        </Badge>
                        <span className="line-clamp-1">{def.meaning}</span>
                      </CardTitle>
                      {def.examples && def.examples.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => toggleExamples(`brit-full-${index}`)}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${expandedExamples[`brit-full-${index}`] ? "rotate-180" : ""}`}
                          />
                          <span className="sr-only">Toggle examples</span>
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-800 dark:text-gray-200">{def.meaning}</p>

                    {def.examples && def.examples.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Examples:</h4>
                        <ul className="space-y-2">
                          {def.examples.slice(0, 3).map((example, i) => {
                            // Clean up the example text by removing extra whitespace and newlines
                            const cleanExample = example.replace(/\s+/g, " ").trim()
                            return (
                              <li
                                key={i}
                                className="text-gray-600 dark:text-gray-400 italic pl-3 border-l-2 border-purple-200 dark:border-purple-800"
                              >
                                "{cleanExample}"
                              </li>
                            )
                          })}
                          {def.examples.length > 3 && (
                            <div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs h-7 mt-1"
                                onClick={() => toggleExamples(`brit-full-${index}`)}
                              >
                                {expandedExamples[`brit-full-${index}`]
                                  ? "Hide"
                                  : `Show ${def.examples.length - 3} more`}{" "}
                                examples
                                <ChevronDown
                                  className={`h-3 w-3 ml-1 transition-transform duration-200 ${expandedExamples[`brit-full-${index}`] ? "rotate-180" : ""}`}
                                />
                              </Button>

                              {expandedExamples[`brit-full-${index}`] && (
                                <ul className="space-y-2 mt-2">
                                  {def.examples.slice(3).map((example, i) => {
                                    // Clean up the example text by removing extra whitespace and newlines
                                    const cleanExample = example.replace(/\s+/g, " ").trim()
                                    return (
                                      <li
                                        key={i + 3}
                                        className="text-gray-600 dark:text-gray-400 italic pl-3 border-l-2 border-purple-200 dark:border-purple-800"
                                      >
                                        "{cleanExample}"
                                      </li>
                                    )
                                  })}
                                </ul>
                              )}
                            </div>
                          )}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500">No Britannica definitions available for this word.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="merriam" className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Merriam-Webster</h2>
          {merriamData && merriamData.entries && merriamData.entries.length > 0 ? (
            <div className="space-y-6">
              {merriamData.entries.map((entry, entryIndex) => (
                <Card key={entryIndex} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                    <div className="flex items-center gap-2">
                      <CardTitle>
                        {entry.headword}
                        {entry.entryNumber && <span className="text-sm text-gray-500 ml-1">({entry.entryNumber})</span>}
                      </CardTitle>
                      {entry.partOfSpeech && entry.partOfSpeech !== "unknown" && (
                        <Badge variant="outline" className="text-xs">
                          {entry.partOfSpeech}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center justify-between">
                      <span>{entry.pronunciation && <span className="italic">[{entry.pronunciation}]</span>}</span>
                      <a
                        href={`https://britannica-clone.onrender.com/api/Dictionary/merriam/${word}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs flex items-center gap-1 text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        View API <ExternalLink className="h-3 w-3" />
                      </a>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {entry.senses && entry.senses.length > 0 ? (
                      <div className="space-y-6">
                        {entry.senses.map((sense, senseIndex) => (
                          <div key={senseIndex} className="flex items-start gap-2">
                            <div className="flex-shrink-0 w-6 text-center">
                              {sense.senseIndicator && (
                                <span className="font-medium text-gray-500">{sense.senseIndicator}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-800 dark:text-gray-200">
                                {/* Clean up definition text by removing extra whitespace and newlines */}
                                {sense.definitionText.replace(/\s+/g, " ").trim()}
                              </p>

                              {sense.verbalIllustrations && sense.verbalIllustrations.length > 0 && (
                                <div className="mt-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-7"
                                    onClick={() => toggleExamples(`merriam-full-${entryIndex}-${senseIndex}`)}
                                  >
                                    {expandedExamples[`merriam-full-${entryIndex}-${senseIndex}`] ? "Hide" : "Show"}{" "}
                                    {sense.verbalIllustrations.length} example
                                    {sense.verbalIllustrations.length > 1 ? "s" : ""}
                                    <ChevronDown
                                      className={`h-3 w-3 ml-1 transition-transform duration-200 ${expandedExamples[`merriam-full-${entryIndex}-${senseIndex}`] ? "rotate-180" : ""}`}
                                    />
                                  </Button>

                                  {expandedExamples[`merriam-full-${entryIndex}-${senseIndex}`] && (
                                    <ul className="mt-2 space-y-1">
                                      {sense.verbalIllustrations.map((example, i) => {
                                        // Clean up the example text
                                        const cleanExample = example.replace(/\s+/g, " ").trim()
                                        return (
                                          <li
                                            key={i}
                                            className="text-gray-600 dark:text-gray-400 italic pl-3 border-l-2 border-blue-200 dark:border-blue-800"
                                          >
                                            "{cleanExample}"
                                          </li>
                                        )
                                      })}
                                    </ul>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No definitions available.</p>
                    )}

                    {entry.inflections && entry.inflections.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Inflections:</h4>
                        <p className="text-gray-700 dark:text-gray-300">{entry.inflections.join(", ")}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {merriamData.etymology &&
                merriamData.etymology.paragraphs &&
                merriamData.etymology.paragraphs.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Etymology</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {merriamData.etymology.paragraphs.map((para, i) => (
                        <p key={i} className="text-gray-700 dark:text-gray-300 mb-2">
                          {para}
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                )}

              {merriamData.firstKnownUse && (
                <Card>
                  <CardHeader>
                    <CardTitle>First Known Use</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">{merriamData.firstKnownUse}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500">No Merriam-Webster definitions available for this word.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
