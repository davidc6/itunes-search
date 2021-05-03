import axios from 'axios'

export const httpClient = () => {
  return axios.create({
    timeout: 2000
  })
}
