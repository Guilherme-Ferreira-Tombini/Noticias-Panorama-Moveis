"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function Advertisements() {
  return (
    <div className="w-full px-5">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div className="bg-blue-500 p-10">
            Item 1
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bg-red-500 p-10">
            Item 2
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bg-green-500 p-10">
            Item 3
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}