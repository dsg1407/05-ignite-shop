import { CartContext } from '@/contexts/cart-context'
import { stripe } from '@/lib/stripe'
import { ImageContainer, SuccessContainer } from '@/styles/pages/success'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import Stripe from 'stripe'

interface SuccessProps {
  customerName: string
  products: {
    id: string
    name: string
    images: string
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const { removeAllItens } = useContext(CartContext)

  useEffect(() => {
    removeAllItens()
  }, [])
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <section>
          {products.map((product) => (
            <ImageContainer key={product.id}>
              <Image src={product.images[0]} alt="" width={140} height={140} />
            </ImageContainer>
          ))}
        </section>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          {products.length === 1
            ? '1 camiseta '
            : `${products.length} camisetas`}{' '}
          já está a caminho da sua casa.
        </p>

        <Link href={'/'}>Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details.name
  const products = session.line_items.data.map(
    (item) => item.price.product
  ) as Stripe.Product[]

  return {
    props: {
      customerName,
      products,
    },
  }
}
