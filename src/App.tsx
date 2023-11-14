import './App.css'

import { useBeststories } from '~/hooks'

function App() {
  const {
    data: beststories,
    length: beststoriesLength,
    nextPage: beststoriesNextPage,
  } = useBeststories()

  return (
    <>
      <h1>Hacker News</h1>

      <div>
        <span className="font-blod mr-2">Best Stories</span>
        <span>all: {beststoriesLength}</span>
      </div>

      <p>
        <a onClick={beststoriesNextPage}>next page</a>
      </p>
      <ul>
        {beststories.length > 0 &&
          beststories.map((item, index) => (
            <li key={item.id}>
              {index}:{' '}
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
