import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '@/styles/pages/app'
import Image from 'next/image'
import { CartButton } from '@/components/cart-button'
import { CartContextProvider } from '@/contexts/cart-context'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>

      <CartContextProvider>
        <Header>
          <Image src={logoImg} alt="" />
          <CartButton />
        </Header>

        <Component {...pageProps} />
      </CartContextProvider>
    </Container>
  )
}
