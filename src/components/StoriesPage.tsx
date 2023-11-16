import { useStoriesByFun } from '~/hooks'
import { getDomainHost } from '~/utils'
import DevPre from './DevPre'

export default (props: {
  title: string
  hook: (pageSize?: number) => ReturnType<typeof useStoriesByFun>
  pageSize?: number
}) => {
  const { title, hook } = props

  const { pageNum, pageSize, prevPage, nextPage, data, loading, Ids } = hook(
    props.pageSize
  )

  const SplitSymbol = () => <span className="op50">|</span>

  return (
    <div>
      <div>
        <span className="font-bold mr-2">{title}</span>
      </div>

      {/* 分页信息 */}
      <div className="flex justify-between gap-1">
        <button onClick={prevPage}>prev</button>

        <span>
          <span className="mx-1">all: {Ids.length}</span>
          <span className="mx-1">
            page: {pageNum * pageSize + 1}~{(pageNum + 1) * pageSize}
          </span>
          <span>{loading ? 'loading...' : 'loading done'}</span>
        </span>

        <button onClick={nextPage}>next</button>
      </div>

      <ul className="list-none p0">
        {!loading &&
          Ids.length > 0 &&
          data.map((item, index) => {
            const itemUrl = `https://news.ycombinator.com/item?id=${item.id}`
            const url = item.url || itemUrl
            const host = item.url ? getDomainHost(item.url) : null
            const date = new Date(item.time * 1000).toLocaleString()

            return (
              <li
                key={item.id}
                className="text-base my-2"
              >
                <span className="mr-2 op75">
                  {(index + pageSize * pageNum + 1).toString()}.
                </span>

                <span>
                  <a
                    className="font-bold"
                    target="_blank"
                    href={url}
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: item.title || '' }}
                    />
                  </a>

                  <div className="text-xs flex gap-2 ">
                    {host && (
                      <a
                        className=""
                        target="_blank"
                        href={`https://news.ycombinator.com/from?site=${host}`}
                      >
                        {host}
                      </a>
                    )}
                    {host && <SplitSymbol />}

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
                  </div>
                </span>

                {/* <DevPre obj={item} /> */}
              </li>
            )
          })}
      </ul>
    </div>
  )
}
