import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createToy from "app/toys/mutations/createToy"
import { ToyForm, FORM_ERROR } from "app/toys/components/ToyForm"

const NewToyPage: BlitzPage = () => {
  const router = useRouter()
  const [createToyMutation] = useMutation(createToy)

  return (
    <div>
      <h1>Create New Toy</h1>

      <ToyForm
        submitText="Create Toy"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateToy}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const toy = await createToyMutation(values)
            router.push(Routes.ShowToyPage({ toyId: toy.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ToysPage()}>
          <a>Toys</a>
        </Link>
      </p>
    </div>
  )
}

NewToyPage.authenticate = true
NewToyPage.getLayout = (page) => <Layout title={"Create New Toy"}>{page}</Layout>

export default NewToyPage
