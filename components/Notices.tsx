import prisma from "@/prisma/db"
import Link from "next/link"

interface NewsItem {
  id: number,
  title: string,
  image: string | null,
  description: string,
  date: Date
}

export default async function NewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { date: 'desc' },
  })

  return (
    <div className="container mx-auto p-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item: NewsItem) => (
          <div key={item.id} className="rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
            <Link href={`/NoticesDetails/${item.id}`} className="block">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <h2 className="text-xl font-semibold hover:text-blue-600 transition-colors">
                {item.title}
              </h2>
            </Link>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <small className="text-gray-400">
              {new Date(item.date).toLocaleDateString('pt-BR')}
            </small>
          </div>
        ))}
      </div>

      {news.length === 0 && (
        <p className="text-gray-500">Nenhuma notícia cadastrada.</p>
      )}
    </div>
  )
}