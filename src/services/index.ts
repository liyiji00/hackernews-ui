import axios from 'axios'
import config from '~/config'
import { TypeItem } from '~/type'

axios.defaults.baseURL = config.baseURL

export function getItemById(id: number, pretty = false) {
  return axios.get<TypeItem>(`/item/${id}.json${pretty ? '?print=pretty' : ''}`)
}

export function getTopstories(pretty = false) {
  return axios.get<number[]>(`/topstories.json${pretty ? '?print=pretty' : ''}`)
}

export function getNewstories(pretty = false) {
  return axios.get<number[]>(`/newstories.json${pretty ? '?print=pretty' : ''}`)
}

export function getBeststories(pretty = false) {
  return axios.get<number[]>(
    `/beststories.json${pretty ? '?print=pretty' : ''}`
  )
}
