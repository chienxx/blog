import useSWR from 'swr'
import type { SpotifyNowPlayingData } from '@/data/types/data.ts'
import { fetcher } from '../utils/misc'

export function useNowPlaying() {
  let { data } = useSWR<SpotifyNowPlayingData>('/api/spotify', fetcher)
  return data || { isPlaying: false }
}
