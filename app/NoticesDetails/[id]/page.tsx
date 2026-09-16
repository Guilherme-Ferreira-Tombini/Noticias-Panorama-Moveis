import prisma from "@/prisma/db"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

import { formatDate } from "@/app/lib/date"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function NewsDetails({ params }: PageProps) {
  const { id } = await params
  const newsId = Number(id)

  const news = await prisma.news.findUnique({
    where: {
      id: newsId,
    },
  })

  if (!news) {
    notFound()
  }

  const src = news.image

  return (
    <div className="flex h-auto w-full flex-col justify-center p-7">
      {src && (
        <Image
          src={src}
          alt={news.title}
          width={1200}
          height={500}
          className="mb-10 h-auto max-h-[500px] w-full rounded-md object-cover"
        />
      )}

      <h1 className="mb-4 text-3xl font-bold">
        {news.title}
      </h1>

      <small className="mb-4 block text-gray-400">
        {formatDate(news.date)}
      </small>

      <p className="whitespace-pre-line text-gray-700">
        {news.description}
      </p>

      <div className="flex items-center justify-end pt-7">
        <Link
          href="/"
          className="w-auto rounded-lg bg-[#054EA1] p-3 text-center text-white"
        >
          Voltar
        </Link>
      </div>
    </div>
  )
}
