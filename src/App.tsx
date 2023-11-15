import './App.css'

import { useBeststories } from '~/hooks'

function App() {
  const {
    beststories,
    beststorieIds,
    pageNum: beststoriesPageNum,
    pageSize: beststoriesPageSize,
    prevPage: beststoriesPrevPage,
    nextPage: beststoriesNextPage,
  } = useBeststories()

  return (
    <>
      <h1>Hacker News</h1>

      <div>
        <span className="font-bold mr-2">Best Stories</span>
      </div>

      <p>
        <button onClick={beststoriesPrevPage}>prev</button>
        <span className="mx-2">
          <span className="mx-1">all: {beststorieIds.length}</span>
          <span className="mx-1">page num: {beststoriesPageNum + 1}</span>
          <span className="mx-1">page size: {beststoriesPageSize}</span>
        </span>

        <button onClick={beststoriesNextPage}>next</button>
      </p>
      <ul>
        {beststories.length > 0 &&
          beststories.map((item, index) => (
            <li key={item.id}>
              {(index + beststoriesPageSize * beststoriesPageNum + 1)
                .toString()
                .padStart(beststorieIds.length.toString().length, '0') + ': '}
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
