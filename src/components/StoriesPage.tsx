import { useStoriesByFun } from '~/hooks'
import { classNames, getDomainHost } from '~/utils'
import { TypeItemStory } from '~/type'

export default (props: {
  title: string
  hook: (pageSize?: number) => ReturnType<typeof useStoriesByFun>
  pageSize?: number
}) => {
  const { title, hook } = props

  const { pageNum, pageSize, prevPage, nextPage, data, loading, Ids } = hook(
    props.pageSize
  )

  const emptyList = new Array(pageSize)
    .fill(0)
    .map<TypeItemStory>((_, index) => ({
      id: index,
      type: 'story',
      by: '',
      descendants: 0,
      kids: [],
      score: 0,
      title: '',
      url: '',
      time: 0,
    }))

  const SplitSymbol = () => <span className="op50">|</span>

  return (
    <div className="mb-4">
      <h2>{title}</h2>

      <ul className="list-none p0 my-2 rd-2 overflow-hidden text-base">
        {(loading ? emptyList : data).map((item, index) => {
          const itemUrl = `https://news.ycombinator.com/item?id=${item.id}`
          const url = item.url || itemUrl
          const host = item.url ? getDomainHost(item.url) : null
          const date = new Date(item.time * 1000).toLocaleString()

          return (
            <li
              key={item.id}
              className={classNames(
                'p-2 hover:bg-gray-300',
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              )}
            >
              <span className="mr-2 op75">
                {(index + pageSize * pageNum + 1).toString()}.
              </span>

              <span>
                <a
                  className="font-600"
                  target="_blank"
                  href={url}
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: item.title || '' }}
                  />
                </a>

                <p className="text-xs flex gap-2 m-0">
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
              </span>

              {/* <DevPre obj={item} /> */}
            </li>
          )
        })}
      </ul>

      {/* 分页信息 */}
      <div className="flex justify-between gap-1 text-xs">
        <button
          className={classNames(
            'rd-2 b-0 px-2 py-1 cursor-pointer',
            'hover:bg-gray-400',
            'active:bg-gray-300'
          )}
          onClick={prevPage}
        >
          prev
        </button>

        <span className="op75">
          <span className="mx-1">all: {Ids.length}</span>
          <span className="mx-1">
            page: {pageNum * pageSize + 1}~{(pageNum + 1) * pageSize}
          </span>
          <span className="mx-1">
            {loading ? 'loading...' : 'loading done'}
          </span>
        </span>

        <button
          className={classNames(
            'rd-2 b-0 px-2 py-1 cursor-pointer',
            'hover:bg-gray-400',
            'active:bg-gray-300'
          )}
          onClick={nextPage}
        >
          next
        </button>
      </div>
    </div>
  )
}
