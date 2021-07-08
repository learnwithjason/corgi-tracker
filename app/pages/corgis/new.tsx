import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCorgi from "app/corgis/mutations/createCorgi"
import { CorgiForm, FORM_ERROR } from "app/corgis/components/CorgiForm"

const NewCorgiPage: BlitzPage = () => {
  const router = useRouter()
  const [createCorgiMutation] = useMutation(createCorgi)

  return (
    <div>
      <h1>Create New Corgi</h1>

      <CorgiForm
        submitText="Create Corgi"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCorgi}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const corgi = await createCorgiMutation(values)
            router.push(Routes.ShowCorgiPage({ corgiId: corgi.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CorgisPage()}>
          <a>Corgis</a>
        </Link>
      </p>
    </div>
  )
}

NewCorgiPage.authenticate = true
NewCorgiPage.getLayout = (page) => <Layout title={"Create New Corgi"}>{page}</Layout>

export default NewCorgiPage
