import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateCorgi = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateCorgi), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const corgi = await db.corgi.create({ data: input })

  return corgi
})
