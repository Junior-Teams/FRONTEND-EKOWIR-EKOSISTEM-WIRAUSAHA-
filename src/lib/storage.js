import { HOST_API } from "@/utils/axiosInstance"

const API_ORIGIN = HOST_API.replace(/\/api\/?$/, "")

export function getStorageUrl(path) {
  if (!path) return undefined
  const encodedPath = path
    .replace(/^\/+/, "")
    .split("/")
    .map(encodeURIComponent)
    .join("/")
  return `${API_ORIGIN}/${encodedPath}`
}
