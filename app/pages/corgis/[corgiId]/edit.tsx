import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCorgi from "app/corgis/queries/getCorgi"
import updateCorgi from "app/corgis/mutations/updateCorgi"
import { CorgiForm, FORM_ERROR } from "app/corgis/components/CorgiForm"

export const EditCorgi = () => {
  const router = useRouter()
  const corgiId = useParam("corgiId", "number")
  const [corgi, { setQueryData }] = useQuery(
    getCorgi,
    { id: corgiId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCorgiMutation] = useMutation(updateCorgi)

  return (
    <>
      <Head>
        <title>Edit Corgi {corgi.id}</title>
      </Head>

      <div>
        <h1>Edit Corgi {corgi.id}</h1>
        <pre>{JSON.stringify(corgi)}</pre>

        <CorgiForm
          submitText="Update Corgi"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCorgi}
          initialValues={corgi}
          onSubmit={async (values) => {
            try {
              const updated = await updateCorgiMutation({
                id: corgi.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowCorgiPage({ corgiId: updated.id }))
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

const EditCorgiPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCorgi />
      </Suspense>

      <p>
        <Link href={Routes.CorgisPage()}>
          <a>Corgis</a>
        </Link>
      </p>
    </div>
  )
}

EditCorgiPage.authenticate = true
EditCorgiPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCorgiPage
