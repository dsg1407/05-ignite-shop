import {
  ChangeLeftSlideContainer,
  ChangeRightSlideContainer,
  HomeContainer,
  Product,
  SliderButton,
} from '@/styles/pages/home'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { stripe } from '@/lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Head from 'next/head'
import { CaretLeft, CaretRight, Handbag } from 'phosphor-react'
import { useState } from 'react'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      origin: currentSlide > 0 ? 'center' : 'auto',
      perView: currentSlide > 0 ? 2 : 1.8,
      spacing: 48,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer
        ref={sliderRef}
        className="keen-slider"
        size={currentSlide > 0 ? 'full' : 'adjusted'}
      >
        {products.map((product) => {
          return (
            <Product
              className="keen-slider__slide"
              key={product.id}
              href={`/product/${product.id}`}
              prefetch={false}
            >
              <Image src={product.imageUrl} alt="" width={520} height={480} />

              <footer>
                <section>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </section>

                <div>
                  <Handbag size={32} weight="bold" />
                </div>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>

      {currentSlide > 0 && (
        <ChangeLeftSlideContainer>
          <SliderButton
            type="button"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
          >
            <CaretLeft size={48} />
          </SliderButton>
        </ChangeLeftSlideContainer>
      )}

      {currentSlide !== products.length - 1 && (
        <ChangeRightSlideContainer>
          <SliderButton
            type="button"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
          >
            <CaretRight size={48} />
          </SliderButton>
        </ChangeRightSlideContainer>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: (price.unit_amount ? price.unit_amount / 100 : 0).toLocaleString(
        'pt-BR',
        {
          style: 'currency',
          currency: 'BRL',
        }
      ),
    }
  })
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hrs
  }
}
