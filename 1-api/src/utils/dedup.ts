import { Collection } from "../types"

export const dedupCollections = (memo: Record<string, string>) => (collection: Collection) => {
  const { collectionName } = collection

  if (!memo[collectionName]) {
    memo[collectionName] = collectionName
    return true
  }
  
  return false
}
