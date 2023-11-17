import StoriesPage from '~/components/StoriesPage'

export default function App() {
  return (
    <>
      <h1>Hacker News</h1>

      <StoriesPage
        pageSize={3}
        type="Top"
      />
      <StoriesPage
        pageSize={3}
        type="New"
      />
      <StoriesPage
        pageSize={3}
        type="Best"
      />
    </>
  )
}
