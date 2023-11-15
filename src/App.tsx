import StoriesPage from './components/StoriesPage'
import { useBeststories, useNewstories, useTopstories } from './hooks'

function App() {
  return (
    <>
      <h1>Hacker News</h1>

      <StoriesPage
        title="New Stories"
        pageSize={3}
        hook={useNewstories}
      />
      <StoriesPage
        title="Top Stories"
        pageSize={3}
        hook={useTopstories}
      />
      <StoriesPage
        title="Best Stories"
        pageSize={3}
        hook={useBeststories}
      />
    </>
  )
}

export default App
