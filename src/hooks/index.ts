import { useEffect, useState } from 'react'
import { getBeststories, getItemById } from '~/services'
import { TypeItems } from '~/type'
import axios from 'axios'

export function useBeststories(pageSize = 10) {
  const [pageNum, setPageNum] = useState(0)

  const [beststorieIds, setBeststorieIds] = useState<number[]>([])
  useEffect(() => {
    getBeststories().then(res => {
      setBeststorieIds(res.data)
    })
  }, [])

  useEffect(() => {
    if (beststorieIds.length > 0) {
      axios
        .all(
          beststorieIds
            .slice(pageNum * pageSize, (pageNum + 1) * pageSize)
            .map(id => getItemById(id))
        )
        .then(allRes => {
          setBeststories(allRes.map(res => res.data))
        })
    }
  }, [beststorieIds, pageNum, pageSize])

  const [beststories, setBeststories] = useState<TypeItems[]>([])

  function prevPage() {
    if (pageNum > 0) {
      setPageNum(pageNum - 1)
    }
  }
  function nextPage() {
    if ((pageNum + 1) * 10 < beststorieIds.length) {
      setPageNum(pageNum + 1)
    }
  }

  return {
    beststories,
    beststorieIds,
    pageNum,
    pageSize,
    prevPage,
    nextPage,
  }
}
