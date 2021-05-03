import axios from "axios"
import NodeCache from "node-cache"
import { hash } from "../utils/hash"

/**
 * A basic abstraction that can be used to swap http libraries
 */
const createAxiosClient = (cache: NodeCache) => {
  let client = axios.create({
    timeout: 2000
  })

  return {
    get: async (url: string) => {
      const key = hash(url)
      const cachedData: any = cache.get(key)
      
      if (cachedData) {        
        return {
          data: cachedData,
          statusCode: 200
        }
      }

      try {        
        const data = await client.get(url)

        cache.set(key, { data: data.data, statusCode: data.status })

        return {
          data: data.data,
          statusCode: data.status
        }
      } catch (e) {
        throw(e)
      }
    }
  }
}

export default {
  createAxiosClient
}
