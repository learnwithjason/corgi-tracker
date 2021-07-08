import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getToy from "app/toys/queries/getToy"
import deleteToy from "app/toys/mutations/deleteToy"

export const Toy = () => {
  const router = useRouter()
  const toyId = useParam("toyId", "number")
  const [deleteToyMutation] = useMutation(deleteToy)
  const [toy] = useQuery(getToy, { id: toyId })

  return (
    <>
      <Head>
        <title>Toy {toy.id}</title>
      </Head>

      <div>
        <h1>Toy {toy.id}</h1>
        <pre>{JSON.stringify(toy, null, 2)}</pre>

        <Link href={Routes.EditToyPage({ toyId: toy.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteToyMutation({ id: toy.id })
              router.push(Routes.ToysPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowToyPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ToysPage()}>
          <a>Toys</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Toy />
      </Suspense>
    </div>
  )
}

ShowToyPage.authenticate = true
ShowToyPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowToyPage
