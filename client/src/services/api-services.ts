export async function getBookByKey(key: string) {
  const res = await fetch(`/api/books/${encodeURIComponent(key)}`);
  if (!res.ok) throw new Error("Book not found");
  return res.json();
}
