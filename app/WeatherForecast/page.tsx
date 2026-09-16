"use client"

import { useEffect, useState } from "react"

type WeatherData = {
  temperature: number
  apparentTemperature: number
  humidity: number
  windSpeed: number
  weatherCode: number
  isDay: boolean
  city: string
}

function describeWeather(code: number, isDay: boolean): { text: string; icon: string } {
  if (code === 0) return { text: isDay ? "Céu limpo" : "Noite limpa", icon: isDay ? "☀️" : "🌙" }
  if (code <= 2) return { text: "Parcialmente nublado", icon: isDay ? "🌤️" : "☁️" }
  if (code === 3) return { text: "Nublado", icon: "☁️" }
  if (code <= 48) return { text: "Neblina", icon: "🌫️" }
  if (code <= 57) return { text: "Garoa", icon: "🌦️" }
  if (code <= 67) return { text: "Chuva", icon: "🌧️" }
  if (code <= 77) return { text: "Neve", icon: "❄️" }
  if (code <= 82) return { text: "Pancadas de chuva", icon: "🌧️" }
  if (code <= 86) return { text: "Pancadas de neve", icon: "🌨️" }
  if (code <= 99) return { text: "Tempestade", icon: "⛈️" }
  return { text: "Desconhecido", icon: "❓" }
}

function getGradient(code: number, isDay: boolean): string {
  if (!isDay) return "from-slate-900 via-indigo-900 to-slate-800"
  if (code === 0) return "from-sky-400 via-blue-500 to-indigo-500"
  if (code <= 3) return "from-blue-400 via-sky-500 to-indigo-500"
  if (code <= 48) return "from-slate-400 via-slate-500 to-slate-600"
  if (code <= 67) return "from-slate-500 via-blue-600 to-slate-700"
  if (code <= 77) return "from-slate-300 via-blue-300 to-slate-400"
  if (code <= 99) return "from-slate-700 via-indigo-800 to-slate-900"
  return "from-blue-400 via-sky-500 to-indigo-500"
}

export default function WeatherForecast() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchWeather(lat: number, lon: number) {
    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,apparent_temperature,relative_humidity_2m,` +
      `wind_speed_10m,weather_code,is_day`

    const geoUrl =
      `https://api.bigdatacloud.net/data/reverse-geocode-client?` +
      `latitude=${lat}&longitude=${lon}&localityLanguage=pt`

    const [weatherRes, geoRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(geoUrl).catch(() => null),
    ])

    if (!weatherRes.ok) throw new Error("Falha ao buscar previsão")

    const w = await weatherRes.json()

    let city = "Sua região"
    if (geoRes && geoRes.ok) {
      const g = await geoRes.json()
      city = g.city || g.locality || g.principalSubdivision || city
    }
    setWeather({
      temperature: Math.round(w.current.temperature_2m),
      apparentTemperature: Math.round(w.current.apparent_temperature),
      humidity: w.current.relative_humidity_2m,
      windSpeed: Math.round(w.current.wind_speed_10m),
      weatherCode: w.current.weather_code,
      isDay: w.current.is_day === 1,
      city,
    })
  }

  function handleGetLocation() {
    setError(null)
    setLoading(true)

    if (!navigator.geolocation) {
      setError("Geolocalização não é suportada pelo seu navegador.")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await fetchWeather(position.coords.latitude, position.coords.longitude)
        } catch {
          setError("Não foi possível buscar a previsão do tempo.")
        } finally {
          setLoading(false)
        }
      },
      (err) => {
        setLoading(false)
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Permissão de localização negada.")
            break
          case err.POSITION_UNAVAILABLE:
            setError("Localização indisponível.")
            break
          case err.TIMEOUT:
            setError("Tempo esgotado ao obter localização.")
            break
          default:
            setError("Erro ao obter localização.")
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
    )
  }

  useEffect(() => {
    handleGetLocation()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col w-full items-center justify-center bg-slate-100 p-6">
        <div className="w-full flex flex-col max-w-md animate-pulse">
          <div className="mb-6 h-6 w-40 rounded bg-slate-300" />
          <div className="mb-4 h-24 w-48 rounded bg-slate-300" />
          <div className="h-6 w-52 rounded bg-slate-300" />
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="h-24 rounded-2xl bg-slate-300" />
            <div className="h-24 rounded-2xl bg-slate-300" />
            <div className="col-span-2 h-24 rounded-2xl bg-slate-300" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-3">
        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-lg">
          <p className="mt-3 text-lg font-medium text-slate-800">{error}</p>
          <button
            onClick={handleGetLocation}
            className="mt-6 rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  if (!weather) return null

  const info = describeWeather(weather.weatherCode, weather.isDay)
  const gradient = getGradient(weather.weatherCode, weather.isDay)

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br ${gradient} p-3 text-white transition-all`}
    >
      <button
        onClick={handleGetLocation}
        className="absolute right-6 top-6 rounded-full bg-white/20 p-3 backdrop-blur-sm transition hover:bg-white/30"
        aria-label="Atualizar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-3-6.7" />
          <path d="M21 3v6h-6" />
        </svg>
      </button>

      <div className="flex w-full max-w-2xl flex-col items-center text-center">
        <div className="mb-8 flex items-center gap-2">
          <span>📍</span>
          <span className="font-bold text-[30px]">{weather.city}</span>
        </div>
        <span className="text-[90px] leading-none drop-shadow-2xl">
          {info.icon}
        </span>
        <p className="mt-4 text-7xl font-bold leading-none tracking-tight">
          {weather.temperature}°
        </p>
        <p className="mt-4 text-2xl text-white/80">{info.text}</p>

        <div className="mt-16 grid w-[80%] grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-white/15 p-4 backdrop-blur-md">
            <p className="text-sm text-white/70">Sensação</p>
            <p className="mt-2 text-3xl font-semibold">
              {weather.apparentTemperature}°
            </p>
          </div>
          <div className="rounded-3xl bg-white/15 p-4 backdrop-blur-md">
            <p className="text-sm text-white/70">Umidade</p>
            <p className="mt-2 text-3xl font-semibold">{weather.humidity}%</p>
          </div>
          <div className="col-span-2 rounded-3xl bg-white/15 p-4 backdrop-blur-md sm:col-span-1">
            <p className="text-sm text-white/70">Vento</p>
            <p className="mt-2 text-3xl font-semibold">
              {weather.windSpeed} km/h
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}