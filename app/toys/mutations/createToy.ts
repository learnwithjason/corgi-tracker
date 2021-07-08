import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateToy = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateToy), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const toy = await db.toy.create({ data: input })

  return toy
})
