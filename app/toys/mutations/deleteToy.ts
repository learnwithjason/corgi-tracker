import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteToy = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteToy), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const toy = await db.toy.deleteMany({ where: { id } })

  return toy
})
