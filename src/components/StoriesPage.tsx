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

  const indexLength = Ids.length.toString().length
  return (
    <div>
      <div>
        <span className="font-bold mr-2">{title}</span>
      </div>

      {/* 分页信息 */}
      <div className="flex justify-center gap-1">
        <button onClick={prevPage}>prev</button>
        <button onClick={nextPage}>next</button>

        <span>
          <span className="mx-1">all: {Ids.length}</span>
          <span className="mx-1">
            page: {pageNum * pageSize + 1}~{(pageNum + 1) * pageSize}
          </span>
          <span>{loading ? 'loading...' : 'loading done'}</span>
        </span>
      </div>

      <ul className="list-none p0">
        {!loading &&
          Ids.length > 0 &&
          data.map((item, index) => (
            <li
              key={item.id}
              className="text-base"
            >
              <span className="mr-2">
                {(index + pageSize * pageNum + 1)
                  .toString()
                  .padStart(indexLength, '0')}
              </span>

              <span>
                <a
                  href={item.url}
                  target="_blank"
                  title={item.url}
                  className="decoration-none color-inherit"
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: item.title || '' }}
                  />
                  <div className="text-xs">
                    <span>{getDomainHost(item.url || '')}</span>
                  </div>
                </a>
              </span>

              <DevPre obj={item} />
            </li>
          ))}
      </ul>
    </div>
  )
}
