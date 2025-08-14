// shared/utils/shareRequest.ts
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

/** Сохраняем объект в LS */
export function saveRequest(lsKey: string, request: unknown) {
  try {
    localStorage.setItem(lsKey, JSON.stringify(request))
  } catch {
    console.log('Ошибка сохранения данных в локальное хранилище')
  }
}

/** Загружаем объект из LS */
export function loadRequest<T = unknown>(lsKey: string): T | null {
  try {
    const raw = localStorage.getItem(lsKey)

    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

/** Кодируем объект в компактную строку для URL (?r=...) */
export function encodeRequestToQuery(request: unknown): string {
  const json = JSON.stringify(request)
  try {
    return compressToEncodedURIComponent(json) // короткий url-safe формат
  } catch {
    return encodeURIComponent(json) // fallback
  }
}

/** Декодируем объект из ?r=... */
export function decodeRequestFromQuery<T = unknown>(raw: string | null): T | null {
  if (!raw) return null
  try {
    const inflated = decompressFromEncodedURIComponent(raw)
    if (inflated) return JSON.parse(inflated) as T
  } catch {
    console.log('Ошибка декодирования query')
  }
  try {
    return JSON.parse(decodeURIComponent(raw)) as T
  } catch {
    return null
  }
}
