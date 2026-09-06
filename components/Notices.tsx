import prisma from "@/prisma/db"

export default async function NewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { date: 'desc' },
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Notícias</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow">
            {item.image && (
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded mb-2" />
            )}
            <h2 className="text-xl font-semibold">{item.title}</h2>
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