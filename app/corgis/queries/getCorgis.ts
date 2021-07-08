import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetCorgisInput
  extends Pick<Prisma.CorgiFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCorgisInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: corgis,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.corgi.count({ where }),
      query: (paginateArgs) => db.corgi.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      corgis,
      nextPage,
      hasMore,
      count,
    }
  }
)
