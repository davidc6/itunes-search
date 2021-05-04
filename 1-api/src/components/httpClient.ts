import axios, { AxiosRequestConfig } from "axios"
import { cache } from "./cache";
import { hash } from "../utils/hash"
import { CacheClient } from "../types"

/**
 * A basic abstraction that can be used to swap http libraries
 */
const createAxiosClient = (cache: CacheClient) => {
  let config: AxiosRequestConfig = {
    timeout: 2000
  }
  const client = axios.create()

  return {
    // useful for setting a separate config per route / request
    setConfig: (customConfig: AxiosRequestConfig) => {
      config = customConfig
    },
    get: async (url: string) => {
      const key = hash(url)
      const cachedData: any = cache.get(key)

      if (cachedData) {
        return {
          data: cachedData.data,
          statusCode: 200
        }
      }

      try {        
        const data = await client.get(url, config)

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

export const axiosClient = createAxiosClient(cache)
