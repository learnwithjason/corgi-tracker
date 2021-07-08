import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetCorgi = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetCorgi), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const corgi = await db.corgi.findFirst({ where: { id } })

  if (!corgi) throw new NotFoundError()

  return {
    ...corgi,
    otherThing: "waddup", // this is some custom data — can be whatever we want
  }
})
