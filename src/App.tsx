import StoriesPage from './components/StoriesPage'
import { useBeststories, useNewstories, useTopstories } from './hooks'

function App() {
  return (
    <>
      <h1>Hacker News</h1>

      <StoriesPage
        title="Top Stories"
        pageSize={5}
        hook={useTopstories}
      />
      <StoriesPage
        title="New Stories"
        pageSize={3}
        hook={useNewstories}
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
