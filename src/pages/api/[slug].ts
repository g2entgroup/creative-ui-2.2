import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

const { CIRCLE_API_KEY } = process.env

export default async function createPayment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    origin: 'https://api-sandbox.circle.com/v1/payments',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['application/json', `Bearer ${CIRCLE_API_KEY}`],
    optionsSuccessStatus: 200,
  });
  try {
    res.json(createPayment)
  } catch (e) {
    res.status(400).json({ error: (e as Error).message })
  }
}
