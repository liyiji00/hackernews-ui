import { useEffect, useState } from 'react'
import { getBeststories, getItemById } from '~/services'
import { TypeItem } from '~/type'
import axios from 'axios'

export function useBeststories(size = 10) {
  const [pageIndex, setPageIndex] = useState(0)

  const [beststories, setBeststories] = useState<number[]>([])
  useEffect(() => {
    getBeststories().then(res => {
      setBeststories(res.data)
    })
  }, [])

  useEffect(() => {
    if (beststories.length > 0) {
      axios
        .all(
          beststories
            .slice(pageIndex * size, (pageIndex + 1) * size)
            .map(id => getItemById(id))
        )
        .then(allRes => {
          setBeststoriesInfo(allRes.map(res => res.data))
        })
    }
  }, [beststories, pageIndex, size])

  const [beststoriesInfo, setBeststoriesInfo] = useState<TypeItem[]>([])

  function nextPage() {
    if ((pageIndex + 1) * 10 < beststories.length) {
      setPageIndex(pageIndex + 1)
    }
  }

  return {
    data: beststoriesInfo,
    length: beststories.length,
    nextPage,
  }
}
