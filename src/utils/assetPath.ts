// 統一處理靜態資源路徑，避免部署到子目錄時圖片失效。
export function assetPath(path: string) {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path

  return `${import.meta.env.BASE_URL}${normalizedPath}`
}
