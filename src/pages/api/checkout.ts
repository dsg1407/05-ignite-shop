import { stripe } from '@/lib/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

type SessionProps = {
  price: string
  quantity: number
}

interface BodyProps {
  groupedItensSession: SessionProps[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { groupedItensSession } = req.body as BodyProps

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (!groupedItensSession) {
    return res.status(400).json({ error: 'Invalid request.' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: groupedItensSession,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
