export async function predict(blob) {
  const fd = new FormData()
  fd.append('file', blob, 'image.jpg')
  const r = await fetch('/predict', { method: 'POST', body: fd })
  if (!r.ok) throw new Error('api error')
  return r.json()               // expects { is_fish: bool }
}