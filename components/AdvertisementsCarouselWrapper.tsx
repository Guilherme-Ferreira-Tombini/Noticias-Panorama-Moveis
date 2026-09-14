import prisma from "@/prisma/db"
import Advertisements from "./Advertisements"
import { toDataUrl } from "@/app/lib/image"

export default async function AdvertisementsCarouselWrapper() {
  const now = new Date()

  const rows = await prisma.advertisements.findMany({
    where: {
      isActive: true,
      startDate: { lte: now },
      OR: [{ endDate: null }, { endDate: { gte: now } }],
    },
    orderBy: { startDate: "desc" },
    take: 10,
  })

  const advertisements = rows.map((ad) => ({
    id: ad.id,
    title: ad.title,
    imageSrc: toDataUrl(ad.image, ad.imageMime) ?? "",
    link: ad.link,
    description: ad.description,
    startDate: ad.startDate,
    endDate: ad.endDate,
  }))

  return <Advertisements advertisements={advertisements} />
}