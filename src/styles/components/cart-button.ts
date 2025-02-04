import { styled } from '..'

export const CartButtonContainer = styled('button', {
  height: 48,
  width: 48,
  padding: 12,

  alignContent: 'center',

  color: '$gray500',
  backgroundColor: '$gray800',
  borderRadius: 6,
  border: 0,
  cursor: 'pointer',

  position: 'relative',
  transition: 'all 0.2s',

  '&:hover': {
    opacity: 0.8,
  },

  span: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 24,
    width: 24,
    alignContent: 'center',

    backgroundColor: '$green500',
    color: '$white',
    fontWeight: 'bold',
    fontSize: '14',
    textAlign: 'center',
    borderRadius: '50%',

    translate: '7px -7px',
  },
})
