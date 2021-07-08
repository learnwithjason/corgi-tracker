import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteCorgi = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteCorgi), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const corgi = await db.corgi.deleteMany({ where: { id } })

  return corgi
})
