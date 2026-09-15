import { toDataUrl } from "@/app/lib/image"
import { formatDate } from "@/app/lib/date"
import prisma from "@/prisma/db"
import Link from "next/link"

export default async function NewsPage() {
  const news = await prisma.news.findMany({
    orderBy: {
      date: "desc",
    },
  })

  const items = news.map((item) => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    image: item.image,
    imageMime: item.imageMime,
    dateLabel: formatDate(item.date),
  }))

  return (
    <div className="container mx-auto p-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const src = toDataUrl(item.image, item.imageMime)

          return (
            <div
              key={item.id}
              className="rounded-lg p-4 shadow transition-shadow hover:shadow-lg"
            >
              <Link
                href={`/NoticesDetails/${item.id}`}
                className="block"
              >
                {src && (
                  <img
                    src={src}
                    alt={item.title}
                    className="mb-2 h-48 w-full rounded object-cover"
                  />
                )}

                <h2 className="text-xl font-semibold transition-colors hover:text-blue-600">
                  {item.title}
                </h2>
              </Link>

              <p className="mt-2 text-gray-600">
                {item.summary}
              </p>

              <small className="text-gray-400">
                {item.dateLabel}
              </small>
            </div>
          )
        })}
      </div>

      {news.length === 0 && (
        <p className="text-gray-500">
          Nenhuma notícia cadastrada.
        </p>
      )}
    </div>
  )
}
