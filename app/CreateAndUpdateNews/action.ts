"use server"

import { revalidatePath } from "next/cache"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { randomUUID } from "crypto"
import { put } from "@vercel/blob"
import prisma from "@/prisma/db"

export async function downloadImage(url: string) {
  if (!url || typeof url !== "string") {
    return { error: "URL inválida." }
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      return { error: "Não foi possível baixar a imagem." }
    }

    const contentType = response.headers.get("content-type") || ""
    if (!contentType.startsWith("image/")) {
      return { error: "A URL não aponta para uma imagem." }
    }

    const extFromType = contentType.split("/")[1]?.split(";")[0] || "jpg"
    const extFromUrl = path.extname(new URL(url).pathname).replace(".", "")
    const ext = extFromUrl || extFromType || "jpg"

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Detecta o modo de autenticação
    const staticToken = process.env.BLOB_READ_WRITE_TOKEN

    const hasStaticToken = staticToken?.startsWith("vercel_blob_rw_") ?? false

    console.log("=== DEBUG BLOB ===")
    console.log("hasStaticToken:", hasStaticToken)

    // Tenta Blob (estático)
    if (hasStaticToken) {
      try {
        const fileName = `news/${randomUUID()}.${ext}`
        console.log("fileName:", fileName)

        const blob = await put(fileName, buffer, {
              access: "public",
              contentType,
              token: staticToken,
            })

        console.log("[downloadImage] salvo no Blob:", blob.url)
        return { path: blob.url }
      } catch (err) {
        console.error("[downloadImage] Blob falhou, caindo para local:", err);
      }
    }

    // Ir pelo local
    const uploadDir = path.join(process.cwd(), "public", "uploads", "news")
    await mkdir(uploadDir, { recursive: true })

    const fileName = `${randomUUID()}.${ext}`
    const filePath = path.join(uploadDir, fileName)

    await writeFile(filePath, buffer)

    console.log("[downloadImage] salvo localmente:", fileName)
    return { path: `/uploads/news/${fileName}` }
  } catch (error) {
    console.error("[downloadImage]", error)
    return { error: "Erro ao salvar a imagem." }
  }
}

export async function getNewsById(id: number) {
  try {
    if (!id || isNaN(id)) return { error: "ID inválido." }

    const news = await prisma.news.findUnique({ where: { id } })
    if (!news) return { error: "Notícia não encontrada." }

    return {
      news: {
        id: news.id,
        title: news.title,
        summary: news.summary,
        description: news.description,
        image: news.image ?? "",
        date: news.date.toISOString(),
      },
    }
  } catch (error) {
    console.error("[getNewsById]", error)
    return { error: "Erro ao carregar notícia." }
  }
}


export async function saveNews(data: {
  id?: number
  title: string
  summary: string
  description: string
  image: string
  date: string
}) {
  try {
    if (!data.title?.trim()) return { error: "O título é obrigatório." }
    if (!data.summary?.trim()) return { error: "O resumo é obrigatório." }
    if (!data.description?.trim()) return { error: "A descrição é obrigatória." }

    const parsedDate = data.date
      ? new Date(`${data.date}T12:00:00.000Z`)
      : new Date()

    if (isNaN(parsedDate.getTime())) {
      return { error: "Data inválida." }
    }

    const payload = {
      title: data.title,
      summary: data.summary,
      description: data.description,
      image: data.image,
      date: parsedDate,
    }

    if (data.id) {
      await prisma.news.update({ where: { id: data.id }, data: payload })
    } else {
      await prisma.news.create({ data: payload })
    }

    revalidatePath("/")
    if (data.id) revalidatePath(`/NoticesDetails/${data.id}`)

    return { success: true }
  } catch (error) {
    console.error("[saveNews]", error)
    return { error: "Erro ao salvar notícia." }
  }
}