import { isNotADuplicate } from "../utils/filter"
import { Artist, Collection, HttpClient } from "../types"

const BASE_URL = 'https://itunes.apple.com';

const getFirstArtist = async (searchTerm: string, httpClient: HttpClient): Promise<Artist> => {
  const path = `/search?media=music&entity=musicArtist&limit=1&${searchTerm}`
  const url = `${BASE_URL}${path}`

  try {        
    const response = await httpClient.get(url)

    if (Array.isArray(response.data.results)) {
      return response.data.results[0]
    }

    return {
      artistId: ''
    }
  } catch (e) {
    throw(e)
  }
}

const getAlbumsByArtistId = async (artistId: string, httpClient: HttpClient): Promise<[] | Collection[]> => {
  if (!artistId) {
    return []
  }

  const path = `/lookup?entity=album&id=${artistId}`
  const url = `${BASE_URL}${path}`

  try {
    const response = await httpClient.get(url)
    
    if (Array.isArray(response.data.results)) {      
      return response.data.results.filter(isNotADuplicate())
    }

    return []
  } catch (e) {
    throw(e)
  }
}

export default { getFirstArtist, getAlbumsByArtistId }
