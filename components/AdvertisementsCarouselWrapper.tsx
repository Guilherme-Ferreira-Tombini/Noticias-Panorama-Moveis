import prisma from "@/prisma/db"
import Advertisements from "./Advertisements"

export default async function AdvertisementsCarouselWrapper() {
  const advertisements = await prisma.advertisements.findMany({
    where: {
      isActive: true,
      AND: [
        {
          startDate: {
            lte: new Date(),
          },
        },
        {
          OR: [
            { endDate: null },
            { endDate: { gte: new Date() } },
          ],
        },
      ],
    },
    orderBy: {
      startDate: 'desc',
    },
    take: 10,
  })

  return <Advertisements advertisements={advertisements}/>
}