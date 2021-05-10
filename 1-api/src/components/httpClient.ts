import axios, { AxiosRequestConfig } from "axios"
import { cache } from "./cache";
import { hash } from "../utils/hash"
import { CacheClient } from "../types"

const createAxiosClient = (cache: CacheClient) => {
  let config: AxiosRequestConfig = {
    timeout: 2000
  }
  const client = axios.create()

  return {
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
        const response = await client.get(url, config)
        const { data, status } = response
        
        cache.set(key, {
          data: data,
          statusCode: status
        })

        return {
          data: data,
          statusCode: status
        }
      } catch (e) {
        throw(e)
      }
    }
  }
}

export const axiosClient = createAxiosClient(cache)
