import { useEffect, useState } from 'react'
import { getBeststories, getItemById } from '~/services'
import { TypeItems } from '~/type'
import axios from 'axios'

export function useBeststories(pageSize = 10) {
  const [pageNum, setPageNum] = useState(0)
  const [loading, setLoading] = useState(true)

  const [Ids, setIds] = useState<number[]>([])
  useEffect(() => {
    getBeststories().then(res => {
      setIds(res.data)
    })
  }, [])

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
