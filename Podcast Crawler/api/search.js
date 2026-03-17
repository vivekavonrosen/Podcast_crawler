export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { q, type = "podcast", page_size = 10, offset = 0 } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing query parameter: q" });
  }

  const apiKey = process.env.LISTENNOTES_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const url = new URL("https://listen-api.listennotes.com/api/v2/search");
  url.searchParams.set("q", q);
  url.searchParams.set("type", type);
  url.searchParams.set("page_size", page_size);
  url.searchParams.set("offset", offset);

  try {
    const response = await fetch(url.toString(), {
      headers: { "X-ListenAPI-Key": apiKey },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
