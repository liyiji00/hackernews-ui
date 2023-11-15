import axios from 'axios'
import config from '~/config'
import { TypeItems } from '~/type'

axios.defaults.baseURL = config.baseURL

export function getItemById(id: number, pretty = false) {
  return axios.get<TypeItems>(
    `/item/${id}.json${pretty ? '?print=pretty' : ''}`
  )
}

/**
 * Up to 500 top stories are at /v0/topstories (also contains jobs).
 */
export function getTopstories(pretty = false) {
  return axios.get<number[]>(`/topstories.json${pretty ? '?print=pretty' : ''}`)
}

/**
 * Up to 500 new stories are at /v0/newstories (also contains jobs).
 */
export function getNewstories(pretty = false) {
  return axios.get<number[]>(`/newstories.json${pretty ? '?print=pretty' : ''}`)
}

/**
 * Up to 500 best stories are at /v0/beststories (also contains jobs).
 */
export function getBeststories(pretty = false) {
  return axios.get<number[]>(
    `/beststories.json${pretty ? '?print=pretty' : ''}`
  )
}
