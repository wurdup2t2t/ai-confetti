import type { NextApiRequest, NextApiResponse } from "next/types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { from, to, message } = req.body;

  if (!from || !to || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  res.status(200).json({
    status: "paid",
    from,
    to,
    message
  });
}
