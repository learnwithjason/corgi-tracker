import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getToys from "app/toys/queries/getToys"

const ITEMS_PER_PAGE = 100

export const ToysList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ toys, hasMore }] = usePaginatedQuery(getToys, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {toys.map((toy) => (
          <li key={toy.id}>
            <Link href={Routes.ShowToyPage({ toyId: toy.id })}>
              <a>{toy.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ToysPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Toys</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewToyPage()}>
            <a>Create Toy</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ToysList />
        </Suspense>
      </div>
    </>
  )
}

ToysPage.authenticate = true
ToysPage.getLayout = (page) => <Layout>{page}</Layout>

export default ToysPage
