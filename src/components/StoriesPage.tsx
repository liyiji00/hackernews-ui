import { useMemo } from 'react'
import { useBeststories, useNewstories, useTopstories } from '~/hooks'
import { classNames } from '~/utils'
import StoriesItem from './StoriesItem'

export default function StoriesPage(props: {
  pageSize?: number
  type: 'Top' | 'New' | 'Best'
}) {
  const hook =
    props.type === 'Best'
      ? useBeststories
      : props.type === 'New'
      ? useNewstories
      : useTopstories

  const { pageNum, pageSize, prevPage, nextPage, data, loading, Ids } = hook(
    props.pageSize
  )

  const maxPageNum = useMemo(() => {
    return (
      ((Ids.length / pageSize) >> 0) + (Ids.length % pageSize === 0 ? 0 : 1)
    )
  }, [Ids, pageSize])

  function Btn(props: {
    onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    class?: string
    children?: string | JSX.Element
  }) {
    return (
      <button
        className={classNames(
          'rd-2 b-0 px-2 py-1 cursor-pointer bg-gray-100',
          'active:bg-gray-200',
          'hover:bg-gray-300',
          props.class
        )}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    )
  }

  return (
    <div className="my-4">
      <div className="flex justify-between">
        <h2 className="my-0">
          {props.type} Stories ({Ids.length}) {loading && 'loading...'}
        </h2>
        {/* 分页信息 */}
        <div className="flex justify-center items-center gap-4 text-xs">
          <Btn onClick={prevPage}>prev</Btn>

          <span className="op75">
            Page: {pageNum + 1} / {maxPageNum}
          </span>

          <Btn onClick={nextPage}>next</Btn>
        </div>
      </div>

      <div className="list-none p0 my-2 rd-2 overflow-hidden text-base">
        {(loading ? new Array(pageSize).fill(null) : data).map(
          (item, index) => (
            <StoriesItem
              index={index + pageSize * pageNum + 1}
              key={item?.id || index}
              data={item}
            />
          )
        )}
      </div>
    </div>
  )
}
