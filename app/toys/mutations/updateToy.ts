import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateToy = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateToy),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const toy = await db.toy.update({ where: { id }, data })

    return toy
  }
)
