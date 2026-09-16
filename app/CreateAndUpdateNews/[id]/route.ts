import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/db"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const newsId = Number(id)

  if (isNaN(newsId)) {
    return NextResponse.json({ message: "ID inválido." }, { status: 400 })
  }

  const news = await prisma.news.findUnique({ where: { id: newsId } })

  if (!news) {
    return NextResponse.json(
      { message: "Notícia não encontrada." },
      { status: 404 }
    )
  }

  return NextResponse.json(news)
}