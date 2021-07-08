import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateCorgi = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string().optional(),
  toyId: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(UpdateCorgi),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const corgi = await db.corgi.update({ where: { id }, data })

    return corgi
  }
)
