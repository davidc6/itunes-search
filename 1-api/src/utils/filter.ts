import { Collection } from "../types"

export const isNotADuplicate = (memo: Map<string, string> = new Map()) => (collection: Collection) => {
  const { collectionName } = collection  

  if (!memo.has(collectionName)) {
    memo.set(collectionName, collectionName)

    return true
  }

  return false
}
