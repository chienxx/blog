import type { Document, MDX } from 'contentlayer2/core'

export type SpotifyNowPlayingData = {
  isPlaying: boolean
  songUrl?: string
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
}

export type Tool = {
  title: string
  category: string
  description: string
  imgSrc?: string
  href?: string
  label?: string
}

export interface ViewApiResponse {
  data?: {
    total: string
  }
}

export type GithubRepository = {
  stargazerCount: number
  description: string
  homepageUrl: string
  languages: {
    color: string
    name: string
  }[]
  name: string
  nameWithOwner: string
  url: string
  forkCount: number
  repositoryTopics: string[]
  lastCommit?: GithubRepositoryCommit
}

// https://docs.github.com/en/graphql/reference/enums#statusstate
export type CommitState = 'SUCCESS' | 'PENDING' | 'FAILURE' | 'ERROR' | 'EXPECTED'

export type GithubRepositoryCommit = {
  id: string
  abbreviatedOid: string
  committedDate: string
  message: string
  url: string
  status: {
    state: CommitState
  }
}

export type MDXDocument = Document & { body: MDX }
export type MDXDocumentDate = MDXDocument & {
  date: string
}

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>
