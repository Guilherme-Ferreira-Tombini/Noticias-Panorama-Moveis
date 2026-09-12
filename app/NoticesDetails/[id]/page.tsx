import prisma from "@/prisma/db"
import Link from "next/link"
import Image from "next/image"

import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function NewsDetails({ params }: PageProps ) {
  const { id } = await params;
  const newsId = Number(id);

  const news = await prisma.news.findUnique({
    where: { id: newsId },
  })

  if (!news) return notFound();

  return (
    <div className="w-[100%] h-auto flex flex-col justify-center p-7">
      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          className="w-[100%] lg:h-[500px] object-cover rounded rounded-md mb-10"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">
        {news.title}
      </h1>

      <small className="text-gray-400 block mb-4">
        {new Date(news.date).toLocaleDateString("pt-BR")}
      </small>

      <p className="text-gray-700 whitespace-pre-line">
        {news.description}
      </p>

      <div className="flex flex-col justify-center items-end pt-7">
        <Link href={"/"} className=" w-auto rounded-lg text-white text-center p-3 bg-[#054EA1]">
          Voltar
        </Link>
      </div>
    </div>
  )
}