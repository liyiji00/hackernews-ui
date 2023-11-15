import StoriesPage from './components/StoriesPage'
import { useBeststories, useNewstories, useTopstories } from './hooks'

function App() {
  return (
    <>
      <h1>Hacker News</h1>

      <StoriesPage
        title="New Stories"
        hook={useNewstories}
      />
      <StoriesPage
        title="Top Stories"
        hook={useTopstories}
      />
      <StoriesPage
        title="Best Stories"
        hook={useBeststories}
      />
    </>
  )
}

export default App
