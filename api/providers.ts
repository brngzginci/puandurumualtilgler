/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return res.status(200).json([
    {
      id: "sahadan",
      name: "Sahadan (Canlı Veri Çekici)",
      active: true,
      desc: "Sahadan.com üzerinden canlı puan durumu (1. Lig, 2. Lig, 3. Lig)."
    },
    {
      id: "manual",
      name: "Manuel / Örnek Veri",
      active: true,
      desc: "Sıralamayı manuel olarak veya JSON yükleyerek düzenleyin."
    }
  ]);
}
