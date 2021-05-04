export type Collection = {
  collectionName: string
}

export type Artist = {
  artistId: string
  artistName?: string
  artistLinkUrl?: string
}

export type CacheClient = {
  get: (key: string) => any
  set: (key: string, data: any) => boolean
}
