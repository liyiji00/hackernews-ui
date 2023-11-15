import { useEffect, useState } from 'react'
import {
  getItemById,
  getTopstories,
  getBeststories,
  getNewstories,
} from '~/services'
import { TypeItems } from '~/type'
import axios, { AxiosResponse } from 'axios'

export function useStoriesByFun(
  fun: () => Promise<AxiosResponse<number[]>>,
  pageSize: number
) {
  const [pageNum, setPageNum] = useState(0)
  const [loading, setLoading] = useState(true)

  const [Ids, setIds] = useState<number[]>([])
  useEffect(() => {
    fun().then(res => {
      setIds(res.data)
    })
  }, [fun])

  useEffect(() => {
    if (Ids.length > 0) {
      axios
        .all(
          Ids.slice(pageNum * pageSize, (pageNum + 1) * pageSize).map(id =>
            getItemById(id)
          )
        )
        .then(allRes => {
          setData(allRes.map(res => res.data))
          setLoading(false)
        })
    }
  }, [Ids, pageNum, pageSize])

  const [data, setData] = useState<TypeItems[]>([])

  function prevPage() {
    if (pageNum > 0) {
      setLoading(true)
      setPageNum(pageNum - 1)
    }
  }
  function nextPage() {
    if ((pageNum + 1) * 10 < Ids.length) {
      setLoading(true)
      setPageNum(pageNum + 1)
    }
  }

  return {
    data,
    Ids,
    loading,
    pageNum,
    pageSize,
    prevPage,
    nextPage,
  }
}

/** Up to 500 top stories are at /v0/topstories (also contains jobs). */
export function useTopstories(pageSize = 10) {
  return useStoriesByFun(getTopstories, pageSize)
}

/** Up to 500 new stories are at /v0/newstories (also contains jobs). */
export function useNewstories(pageSize = 10) {
  return useStoriesByFun(getNewstories, pageSize)
}

/** Up to 500 best stories are at /v0/beststories (also contains jobs). */
export function useBeststories(pageSize = 10) {
  return useStoriesByFun(getBeststories, pageSize)
}
