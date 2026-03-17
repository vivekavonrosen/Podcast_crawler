export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { q, offset = 0 } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter q' });
  }

  const apiKey = process.env.LISTEN_NOTES_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  const url =
    `https://listen-api.listennotes.com/api/v2/search` +
    `?q=${encodeURIComponent(q)}` +
    `&type=episode` +
    `&offset=${offset}` +
    `&len_min=1` +
    `&language=English` +
    `&sort_by_date=1`;

  try {
    const response = await fetch(url, {
      headers: { 'X-ListenAPI-Key': apiKey }
    });

    const data = await response.json();

    // Pass through the status code from Listen Notes
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Upstream request failed: ' + err.message });
  }
}
