"use client"

import { Suspense, useState, useTransition, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { saveNews, downloadImage, getNewsById } from "./action"

const initialForm = {
  title: "",
  summary: "",
  description: "",
  image: "",
  date: new Date().toISOString().split("T")[0],
}

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

function CreateAndUpdateNewsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("id")
  const isEditing = Boolean(editId)

  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()

  const lastDownloaded = useRef<string | null>(null)

  const handleChange = (e: React.ChangeEvent<FormElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value, type, checked } = target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  useEffect(() => {
    if (!editId) return

    const load = async () => {
      setLoading(true)
      setError(null)

      const result = await getNewsById(Number(editId))

      if (result.error || !result.news) {
        setError(result.error ?? "Erro ao carregar.")
        setLoading(false)
        return
      }

      const news = result.news

      setForm({
        title: news.title ?? "",
        summary: news.summary ?? "",
        description: news.description ?? "",
        image: news.image ?? "",
        date: news.date
          ? new Date(news.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      })

      lastDownloaded.current = news.image ?? null
      setLoading(false)
    }

    load()
  }, [editId])

  useEffect(() => {
    const url = form.image.trim()

    if (!url) return
    if (url.startsWith("/uploads/")) return
    if (lastDownloaded.current === url) return

    let isValid = false
    try {
      const parsed = new URL(url)
      isValid = parsed.protocol === "http:" || parsed.protocol === "https:"
    } catch {
      isValid = false
    }
    if (!isValid) return

    const timer = setTimeout(async () => {
      setError(null)
      setDownloading(true)
      try {
        const result = await downloadImage(url)
        if (result.error) {
          setError(result.error)
          return
        }
        lastDownloaded.current = url
        setForm((prev) => ({ ...prev, image: result.path! }))
      } catch {
        setError("Erro ao baixar imagem.")
      } finally {
        setDownloading(false)
      }
    }, 800)

    return () => clearTimeout(timer)
  }, [form.image])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!form.title.trim()) return setError("O título é obrigatório.")
    if (!form.summary.trim()) return setError("O resumo é obrigatório.")
    if (!form.description.trim()) return setError("A descrição é obrigatória.")

    if (downloading) {
      setError("Aguarde o download da imagem terminar.")
      return
    }

    if (form.image && !form.image.startsWith("/uploads/")) {
      setError("A imagem ainda não foi baixada. Aguarde um instante.")
      return
    }

    startTransition(async () => {
      const result = await saveNews({
        id: editId ? Number(editId) : undefined,
        title: form.title,
        summary: form.summary,
        description: form.description,
        image: form.image,
        date: form.date,
      })

      if (result.error) {
        setError(result.error)
        return
      }

      setSuccess(true)
      setForm(initialForm)
      lastDownloaded.current = null

      setTimeout(() => {
        router.push(isEditing ? `/NoticesDetails/${editId}` : "/")
        router.refresh()
      }, 1000)
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditing ? "Editar Notícia" : "Cadastrar Notícia"}
            </h1>
            <p className="text-sm text-gray-500">
              {isEditing ? "Altere os campos abaixo." : "Preencha os campos abaixo."}
            </p>
          </div>
          <Link
            href="/"
            className="w-auto rounded-lg bg-[#054EA1] hover:bg-blue-700 p-3 text-center text-white"
          >
            Voltar
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded bg-green-50 text-green-700 text-sm border border-green-200">
            {isEditing ? "Notícia atualizada com sucesso! Redirecionando..." : "Notícia cadastrada com sucesso! Redirecionando..."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Digite o título da notícia"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resumo *
            </label>
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              rows={3}
              placeholder="Escreva o resumo da notícia..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              placeholder="Descrição completa da notícia..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL da Imagem
            </label>

            <div className="relative">
              <input
                type="url"
                name="image"
                value={form.image.startsWith("/uploads/") ? "" : form.image}
                onChange={handleChange}
                placeholder="https://exemplo.com/imagem.jpg"
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={downloading}
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {downloading && (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                )}
                {!downloading && form.image.startsWith("/uploads/") && (
                  <span className="text-green-600 text-sm">✓</span>
                )}
              </div>
            </div>

            {form.image.startsWith("/uploads/") && (
              <div className="relative w-full h-48 mt-3 rounded-md overflow-hidden border">
                <Image
                  src={form.image}
                  alt="Pré-visualização"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            )}

            {downloading && (
              <p className="mt-2 text-xs text-gray-500">
                Baixando imagem...
              </p>
            )}

            {!downloading && form.image.startsWith("/uploads/") && (
              <p className="mt-2 text-xs text-green-600">
                Imagem salva localmente em <code>{form.image}</code>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending || downloading}
              className="flex-1 bg-[#054EA1] hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition"
            >
              {isPending ? isEditing ? "Salvando..." : "Cadastrando..." : downloading ? "Aguarde o download..." : isEditing ? "Salvar Alterações" : "Cadastrar Notícia"}
            </button>
            <button
              type="button"
              onClick={() => {
                setForm(initialForm)
                lastDownloaded.current = null
              }}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition"
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CreateAndUpdateNews() {
  return (
    <Suspense fallback={<div className="p-10 text-gray-500">Carregando...</div>}>
      <CreateAndUpdateNewsContent />
    </Suspense>
  )
}