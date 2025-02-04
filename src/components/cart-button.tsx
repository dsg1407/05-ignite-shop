import {
  CartButtonContainer,
  CartList,
  CartListItem,
  CartResumeRow,
  CheckoutButton,
  CloseModalButton,
  ModalContainer,
  ModalOverlay,
} from '@/styles/components/cart-button'
import Image from 'next/image'
import { Handbag, X } from 'phosphor-react'
import { useState } from 'react'

import imgTest from '@/assets/camisetas/1.png'

export function CartButton() {
  const [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <>
      <CartButtonContainer onClick={() => setIsModalOpen(true)}>
        <Handbag weight="bold" size={24} />
        <span>1</span>
      </CartButtonContainer>

      {isModalOpen && (
        <>
          <ModalOverlay onClick={() => setIsModalOpen(false)} />
          <ModalContainer>
            <CloseModalButton onClick={() => setIsModalOpen(false)}>
              <X size={24} />
            </CloseModalButton>

            <h2>Sacola de compras</h2>

            <CartList>
              <CartListItem>
                <Image src={imgTest.src} alt="" width={102} height={93} />

                <div>
                  <p>Camiseta Beyond the LimitLimit LimitsssLimits</p>
                  <span>R$ 79,90</span>
                  <button type="button">Remover</button>
                </div>
              </CartListItem>
            </CartList>

            <CartResumeRow>
              <p>Quantidade</p>
              <span>3 itens</span>
            </CartResumeRow>

            <CartResumeRow total>
              <p>Valor total</p>
              <span>R$ 270,00</span>
            </CartResumeRow>

            <CheckoutButton type="button">Finalizar compra</CheckoutButton>
          </ModalContainer>
        </>
      )}
    </>
  )
}
