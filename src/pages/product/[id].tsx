import { CartContext, CartItem } from '@/contexts/cart-context'
import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import Stripe from 'stripe'
import * as uuid from 'uuid'

interface ProductProps extends CartItem {}

export default function Product({ product }: ProductProps) {
  const { isFallback, back } = useRouter()
  const { addNewItem } = useContext(CartContext)

  async function handleBuyProduct() {
    const newProduct = product
    addNewItem({
      id: uuid.v4(),
      product: newProduct,
    })
    back()
  }

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {(product.price / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>

          <p>{product.description}</p>

          <button onClick={handleBuyProduct}>Comprar agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_RhZfvvVZ4QuoQN' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        defaultPriceId: price.id,
        price: price.unit_amount ? price.unit_amount : 0,
        description: product.description,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
