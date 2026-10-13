"use client"

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-6 text-center">
      <h1 className="text-xl font-semibold text-gray-800">
        Não foi possível carregar as informações.
      </h1>
      <p className="mt-2 text-gray-600">
        O banco de dados está indisponível no momento. Tente novamente mais tarde.
      </p>
    </div>
  )
}