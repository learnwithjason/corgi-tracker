import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetToysInput
  extends Pick<Prisma.ToyFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetToysInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: toys,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.toy.count({ where }),
      query: (paginateArgs) => db.toy.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      toys,
      nextPage,
      hasMore,
      count,
    }
  }
)
