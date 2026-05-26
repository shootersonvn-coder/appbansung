export default async function handler(req, res) {
  try {

    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        error: "Missing ISSF url"
      });
    }

    if (!url.includes("issf-sports.org")) {
      return res.status(400).json({
        error: "Only ISSF links allowed"
      });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/html"
      }
    });

    const html = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    return res.status(200).send(html);

  } catch (err) {

    return res.status(500).json({
      error: "ISSF fetch failed",
      detail: err.message
    });

  }
}