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
import { useContext, useState } from 'react'

import { CartContext } from '@/contexts/cart-context'
import axios from 'axios'

export function CartButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  useState(false)

  const { itensList, removeItem } = useContext(CartContext)

  const cartTotalPrice = itensList.reduce(
    (acc, item) => acc + item.product.price,
    0
  )

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const itensSession = itensList.map((item) => {
        return {
          price: item.product.defaultPriceId,
          quantity: 1,
        }
      })

      const groupedItensSession = itensSession.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.price === item.price)
        if (existingItem) {
          existingItem.quantity += item.quantity
        } else {
          acc.push({ ...item })
        }
        return acc
      }, [])

      const response = await axios.post('/api/checkout', {
        groupedItensSession,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      alert('Falha ao redirecionar ao checkout!')
    } finally {
      setIsCreatingCheckoutSession(false)
    }
  }

  return (
    <>
      <CartButtonContainer onClick={() => setIsModalOpen(true)}>
        <Handbag weight="bold" size={24} />
        {itensList.length > 0 && <span>{itensList.length}</span>}
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
              {itensList.length > 0 ? (
                itensList.map((item) => {
                  return (
                    <CartListItem key={item.id}>
                      <Image
                        src={item.product.imageUrl}
                        alt=""
                        width={102}
                        height={93}
                      />

                      <div>
                        <p>{item.product.name}</p>
                        <span>
                          {(item.product.price / 100).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                        >
                          Remover
                        </button>
                      </div>
                    </CartListItem>
                  )
                })
              ) : (
                <span>Sem itens no carrinho</span>
              )}
            </CartList>

            <CartResumeRow>
              <p>Quantidade</p>
              <span>
                {itensList.length === 1
                  ? `1 item`
                  : `${itensList.length} itens`}
              </span>
            </CartResumeRow>

            <CartResumeRow total>
              <p>Valor total</p>
              <span>
                {(cartTotalPrice / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </CartResumeRow>

            <CheckoutButton
              type="button"
              disabled={itensList.length === 0 || isCreatingCheckoutSession}
              onClick={handleBuyProduct}
            >
              Finalizar compra
            </CheckoutButton>
          </ModalContainer>
        </>
      )}
    </>
  )
}
