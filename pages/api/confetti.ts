export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  // Trust router: require payment proof header
  const pay = req.headers["payment-signature"];
  if (!pay) return res.status(402).json({ error: "Payment required" });

  const { from, to, message } = req.body || {};
  if (!from || !to || !message) return res.status(400).json({ error: "Missing fields" });

  // TODO: save order / fulfillment queue
  return res.status(200).json({ ok: true });
}
