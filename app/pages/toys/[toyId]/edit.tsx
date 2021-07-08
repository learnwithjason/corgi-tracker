import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getToy from "app/toys/queries/getToy"
import updateToy from "app/toys/mutations/updateToy"
import { ToyForm, FORM_ERROR } from "app/toys/components/ToyForm"

export const EditToy = () => {
  const router = useRouter()
  const toyId = useParam("toyId", "number")
  const [toy, { setQueryData }] = useQuery(
    getToy,
    { id: toyId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateToyMutation] = useMutation(updateToy)

  return (
    <>
      <Head>
        <title>Edit Toy {toy.id}</title>
      </Head>

      <div>
        <h1>Edit Toy {toy.id}</h1>
        <pre>{JSON.stringify(toy)}</pre>

        <ToyForm
          submitText="Update Toy"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateToy}
          initialValues={toy}
          onSubmit={async (values) => {
            try {
              const updated = await updateToyMutation({
                id: toy.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowToyPage({ toyId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditToyPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditToy />
      </Suspense>

      <p>
        <Link href={Routes.ToysPage()}>
          <a>Toys</a>
        </Link>
      </p>
    </div>
  )
}

EditToyPage.authenticate = true
EditToyPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditToyPage
