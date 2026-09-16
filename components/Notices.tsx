import { formatDate } from "@/app/lib/date"
import prisma from "@/prisma/db"
import Link from "next/link"
import Image from "next/image"

export default async function NewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { date: "desc" },
  })

  const items = news.map((item) => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    image: item.image,
    dateLabel: formatDate(item.date),
  }))

  return (
    <div className="container mx-auto p-10">
      <div className="flex items-center justify-start mb-6">
        <Link
          href="/CreateAndUpdateNews"
          className="bg-[#054EA1] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
        >
          + Nova Notícia
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const src = item.image

          return (
            <div
              key={item.id}
              className="rounded-lg p-4 shadow transition-shadow hover:shadow-lg"
            >
              <Link href={`/NoticesDetails/${item.id}`} className="block">
                {src && (
                  <div className="relative mb-2 h-48 w-full rounded overflow-hidden">
                    <Image
                      src={src}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                <h2 className="text-xl font-semibold transition-colors hover:text-blue-600">
                  {item.title}
                </h2>
              </Link>

              <p className="mt-2 text-gray-600">{item.summary}</p>

              <small className="text-gray-400">{item.dateLabel}</small>
            </div>
          )
        })}
      </div>

      {news.length === 0 && (
        <p className="text-gray-500">Nenhuma notícia cadastrada.</p>
      )}
    </div>
  )
}