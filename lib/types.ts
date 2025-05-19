// Britannica Types
export interface BritannicaEntryLinkDto {
  Text: string
  Link: string
}

export interface BritannicaImageDto {
  Src: string
  Alt: string
}

export interface BritannicaMeaningDto {
  Definition: string
  Examples: string[]
}

export interface BritannicaWordOfTheDayDto {
  wordAndPos: string
  image: {
    src: string
    alt: string
  }
  meanings: Array<{
    definition: string
    examples: string[]
  }>
}

// Updated to match the actual API response format (camelCase)
export interface BritannicaDefinitionDto {
  meaning: string
  examples: string[]
}

// Updated to match the actual API response format (camelCase)
export interface MerriamWebsterLinkDto {
  text: string
  href?: string
}

export interface MerriamWebsterSenseDto {
  senseIndicator: string
  definitionText: string
  verbalIllustrations: string[]
}

export interface MerriamWebsterEntryDto {
  headword: string
  entryNumber?: string
  pronunciation?: string
  partOfSpeech: string
  senses: MerriamWebsterSenseDto[]
  inflections: string[]
  derivedForms: MerriamWebsterLinkDto[]
  audioFileKey?: string
  audioDirectory?: string
}

export interface MerriamWebsterEtymologyDto {
  paragraphs: string[]
}

export interface MerriamWebsterExampleSentenceDto {
  text: string
  source?: string
}

export interface MerriamWebsterPhraseDto {
  phrase: string
  definition: string
}

export interface MerriamWebsterKidsDefinitionDto {
  headword: string
  pronunciation?: string
  partOfSpeech: string
  definitions: string[]
  link?: string
}

// Updated to match the actual API response format (camelCase)
export interface MerriamWebsterResultDto {
  wordSearched: string
  entries: MerriamWebsterEntryDto[]
  etymology?: MerriamWebsterEtymologyDto
  firstKnownUse?: string
  wordHistoryParagraphs: string[]
  generalExampleSentences: MerriamWebsterExampleSentenceDto[]
  phrasesContainingWord: MerriamWebsterPhraseDto[]
  pageLevelSynonyms: MerriamWebsterLinkDto[]
  thesaurusLink?: string
  synonymDiscussionParagraphs: string[]
  relatedArticles: MerriamWebsterLinkDto[]
  nearbyEntries: MerriamWebsterLinkDto[]
  rhymes: string[]
  kidsDefinition?: MerriamWebsterKidsDefinitionDto
}
