import NodeCache from "node-cache"

const createCache = () => {
  const cacheInstance = new NodeCache( { stdTTL: 100, checkperiod: 120 } )

  return {
    get: (key) => cacheInstance.get(key),
    set: (key, data) => cacheInstance.set(key, data)
  }
}

export const cache = createCache()
