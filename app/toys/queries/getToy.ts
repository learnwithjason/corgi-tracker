import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetToy = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetToy), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const toy = await db.toy.findFirst({ where: { id }, include: { corgi: true } })

  if (!toy) throw new NotFoundError()

  return toy
})
