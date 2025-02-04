import { CartButtonContainer } from '@/styles/components/cart-button'
import { Handbag } from 'phosphor-react'

export function CartButton() {
  return (
    <CartButtonContainer>
      <Handbag weight="bold" size={24} />
      <span>1</span>
    </CartButtonContainer>
  )
}
