import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCorgis from "app/corgis/queries/getCorgis"

const ITEMS_PER_PAGE = 100

export const CorgisList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ corgis, hasMore }] = usePaginatedQuery(getCorgis, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "space-between",
          padding: 0,
        }}
      >
        {corgis.map((corgi) => (
          <li key={corgi.id} style={{ padding: 0 }}>
            <Link href={Routes.ShowCorgiPage({ corgiId: corgi.id })}>
              <a>
                {corgi.image && (
                  <img
                    src={corgi.image}
                    alt={corgi.name}
                    style={{
                      width: 200,
                      height: 200,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                )}
                {corgi.name}
              </a>
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

const CorgisPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Corgis</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCorgiPage()}>
            <a>Create Corgi</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CorgisList />
        </Suspense>
      </div>
    </>
  )
}

CorgisPage.authenticate = true
CorgisPage.getLayout = (page) => <Layout>{page}</Layout>

export default CorgisPage
