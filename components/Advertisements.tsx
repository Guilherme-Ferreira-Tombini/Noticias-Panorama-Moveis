"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import Image from "next/image"
import Link from "next/link"

import "swiper/css"
import "swiper/css/pagination"

interface Advertisement {
  id: string
  title: string
  image: string
  link: string | null
  description: string | null
  isActive: boolean
  startDate: Date
  endDate: Date | null
  createdAt: Date
  updatedAt: Date
}

export default function Advertisements({ advertisements = [] }: { advertisements?: Advertisement[] }) {
  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })

  return (
    <div className="w-[80%] pt-10">
      {advertisements.length > 0 ? (
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{ 1024: { slidesPerView: 1 } }}
        >
          {advertisements.map((ad) => (
            <SwiperSlide key={ad.id}>
              {ad.link ? (
                <Link href={ad.link} target="_blank" rel="noopener noreferrer">
                  <AdCard ad={ad} formatDate={formatDate} />
                </Link>
              ) : (
                <AdCard ad={ad} formatDate={formatDate} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">Nenhum anúncio disponível no momento.</p>
        </div>
      )}
    </div>
  )
}

function AdCard({ ad, formatDate }: { ad: Advertisement; formatDate: (date: Date) => string }) {
  return (
    <div className="overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-70">
        <Image
          src={ad.image}
          alt={ad.title}
          fill
          className=" w-full h-full"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {ad.endDate ? <>Até {formatDate(ad.endDate)}</> : "Válido"}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{ad.title}</h3>

        {ad.description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-3">{ad.description}</p>
        )}

        <div className="flex justify-between items-center mt-2">
          <small className="text-gray-500">Início: {formatDate(ad.startDate)}</small>
        </div>
      </div>
    </div>
  )
}