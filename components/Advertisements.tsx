"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import Link from "next/link"

import "swiper/css"
import "swiper/css/pagination"

interface Advertisement {
  id: string
  title: string
  imageSrc: string
  link: string | null
  description: string | null
  startDate: Date
  endDate: Date | null
}

interface AdvertisementsProps {
  advertisements?: Advertisement[]
}

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

export default function Advertisements({ advertisements = [] }: AdvertisementsProps) {
  if (advertisements.length === 0) {
    return (
      <div className="w-[80%] pt-10 text-center py-10">
        <p className="text-gray-500">Nenhum anúncio disponível no momento.</p>
      </div>
    )
  }

  return (
    <div className="w-[80%] pt-10">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {advertisements.map((ad) => (
          <SwiperSlide key={ad.id}>
            <AdCard ad={ad} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

function AdCard({ ad }: { ad: Advertisement }) {
  const card = (
    <div className="overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-70">
        {ad.imageSrc && (
          <img
            src={ad.imageSrc}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {ad.endDate ? `Até ${formatDate(ad.endDate)}` : "Válido"}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{ad.title}</h3>

        {ad.description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-3">
            {ad.description}
          </p>
        )}

        <div className="flex justify-between items-center mt-2">
          <small className="text-gray-500">
            Início: {formatDate(ad.startDate)}
          </small>
        </div>
      </div>
    </div>
  )

  if (!ad.link) return card

  return (
    <Link href={ad.link} target="_blank" rel="noopener noreferrer">
      {card}
    </Link>
  )
}