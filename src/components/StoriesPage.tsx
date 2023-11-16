import { useStoriesByFun } from '~/hooks'
import { classNames, getDomainHost } from '~/utils'

export default (props: {
  title: string
  hook: (pageSize?: number) => ReturnType<typeof useStoriesByFun>
  pageSize?: number
}) => {
  const { title, hook } = props

  const { pageNum, pageSize, prevPage, nextPage, data, loading, Ids } = hook(
    props.pageSize
  )

  const emptyList = new Array<null>(pageSize).fill(null)

  const Btn = (props: {
    onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    class?: string
    children?: string | JSX.Element
  }) => (
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

  const SplitSymbol = () => <span className="op50 select-none">|</span>

  const Item = (props: {
    key: number
    children?: string | JSX.Element | JSX.Element[]
  }) => (
    <li
      key={props.key}
      className={classNames(
        'p-2 hover:bg-gray-300 h-10',
        props.key % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
      )}
    >
      {props.children}
    </li>
  )

  return (
    <div className="mb-4">
      <h2>{title}</h2>

      <ul className="list-none p0 my-2 rd-2 overflow-hidden text-base">
        {(loading ? emptyList : data).map((item, index) => {
          if (item === null) return <Item key={index} />

          const itemUrl = `https://news.ycombinator.com/item?id=${item.id}`
          const url = item.url || itemUrl
          const host = item.url ? getDomainHost(item.url) : null
          const date = new Date(item.time * 1000).toLocaleString()

          return (
            <Item key={item.id}>
              <div>
                <span className="mr-2 op75 select-none">
                  {(index + pageSize * pageNum + 1).toString()}.
                </span>
                <a
                  className="font-600"
                  target="_blank"
                  href={url}
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: item.title || '' }}
                  />
                </a>
              </div>

              <p className=" text-xs flex gap-2 m-0">
                {host && (
                  <>
                    <a
                      className="color-blue-400"
                      target="_blank"
                      href={`https://news.ycombinator.com/from?site=${host}`}
                    >
                      {host}
                    </a>
                    <SplitSymbol />
                  </>
                )}

                <a
                  className=""
                  target="_blank"
                  href={itemUrl}
                >
                  {item.score || 0} points{' '}
                </a>

                <SplitSymbol />

                <a
                  className=""
                  target="_blank"
                  href={`https://news.ycombinator.com/user?id=${item.by}`}
                >
                  {item.by}
                </a>
                <SplitSymbol />

                <a
                  className=""
                  target="_blank"
                  href={itemUrl}
                >
                  {date}
                </a>
                <SplitSymbol />

                <a
                  className=""
                  target="_blank"
                  href={itemUrl}
                >
                  {item.descendants || 0} comments
                </a>
              </p>

              {/* <DevPre obj={item} /> */}
            </Item>
          )
        })}
      </ul>

      {/* 分页信息 */}
      <div className="flex justify-between gap-1 text-xs">
        <Btn onClick={prevPage}>prev</Btn>

        <span className="op75">
          <span className="mx-1">all: {Ids.length}</span>
          <span className="mx-1">
            page: {pageNum * pageSize + 1}~{(pageNum + 1) * pageSize}
          </span>
          <span className="mx-1">
            {loading ? 'loading...' : 'loading done'}
          </span>
        </span>

        <Btn onClick={nextPage}>next</Btn>
      </div>
    </div>
  )
}
