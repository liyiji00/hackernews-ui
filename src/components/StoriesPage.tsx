import { useStoriesByFun } from '~/hooks'

export default (props: {
  title: string
  hook: (pageSize?: number) => ReturnType<typeof useStoriesByFun>
}) => {
  const { title, hook } = props

  const { pageNum, pageSize, prevPage, nextPage, data, loading, Ids } = hook()

  return (
    <div>
      <div>
        <span className="font-bold mr-2">{title}</span>
      </div>

      {/* 分页信息 */}
      <div>
        <p>
          <button onClick={prevPage}>prev</button>
          <span className="mx-2">
            <span className="mx-1">all: {Ids.length}</span>
            <span className="mx-1">
              {pageNum * pageSize + 1} ~ {(pageNum + 1) * pageSize}
            </span>
          </span>

          <button onClick={nextPage}>next</button>
        </p>
        <p>loading: {loading ? 'true' : 'false'}</p>
      </div>

      <ul>
        {!loading &&
          Ids.length > 0 &&
          data.map((item, index) => (
            <li key={item.id}>
              {(index + pageSize * pageNum + 1)
                .toString()
                .padStart(Ids.length.toString().length, '0') + ': '}
              <a
                href={item.url}
                target="_blank"
              >
                {item.title}
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}
