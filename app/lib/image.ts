export function toDataUrl(
  image: Uint8Array | null | undefined,
  mime: string | null | undefined
): string | null {
  if (!image) return null
  return `data:${mime ?? "image/png"};base64,${Buffer.from(image).toString("base64")}`
}