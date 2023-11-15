import { useBeststories } from '~/hooks'

function App() {
  const beststories = useBeststories()

  return (
    <>
      <h1>Hacker News</h1>

      <div>
        <span className="font-bold mr-2">Best Stories</span>
      </div>

      <p>
        <button onClick={beststories.prevPage}>prev</button>
        <span className="mx-2">
          <span className="mx-1">all: {beststories.Ids.length}</span>
          <span className="mx-1">page num: {beststories.pageNum + 1}</span>
          <span className="mx-1">page size: {beststories.pageSize}</span>
        </span>

        <button onClick={beststories.nextPage}>next</button>
      </p>
      <p>loading: {beststories.loading ? 'true' : 'false'}</p>
      <ul>
        {!beststories.loading &&
          beststories.Ids.length > 0 &&
          beststories.data.map((item, index) => (
            <li key={item.id}>
              {(index + beststories.pageSize * beststories.pageNum + 1)
                .toString()
                .padStart(beststories.Ids.length.toString().length, '0') + ': '}
              <a
                href={item.url}
                target="filter-drop-shadow"
              >
                {item.title}
              </a>
            </li>
          ))}
      </ul>
    </>
  )
}

export default App
