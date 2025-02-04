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

export const ModalOverlay = styled('button', {
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 1,
  width: '100vw',
  height: '100vh',

  border: 0,
  backgroundColor: '$gray900',
  opacity: 0.3,
})

export const ModalContainer = styled('aside', {
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 2,

  minHeight: '100vh',
  maxHeight: '100vh',
  width: 480,
  overflow: 'hidden',
  padding: '24px 48px 48px',

  backgroundColor: '$gray800',
  boxShadow: '-4px 0px 30px 0px rgba(0, 0, 0, 0.80)',

  display: 'flex',
  flexDirection: 'column',

  h2: {
    fontSize: '$lg',
    color: '$gray100',
    fontWeight: 'bold',
    marginTop: 24,
  },
})

export const CartResumeRow = styled('div', {
  marginTop: 7,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  p: {
    color: '$gray100',
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  span: {
    color: '$gray300',
    fontSize: '$md',
    lineHeight: 1.6,
  },

  variants: {
    total: {
      true: {
        fontWeight: 'bold',

        p: {
          fontSize: '$md',
          color: '$gray100',
        },

        span: {
          fontSize: '$xl',
          color: '$gray100',
          lineHeight: 1.4,
        },
      },
    },
  },
})

export const CartList = styled('session', {
  marginTop: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,

  flex: 1,
  maxHeight: 'calc(100vh - 380px)',
  overflowY: 'auto',

  span: {
    fontSize: '1rem',
    color: '$gray500',
  },
})

export const CartListItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  fontSize: '$md',
  lineHeight: 1.6,

  img: {
    background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    objectFit: 'cover',
  },

  div: {
    maxWidth: '100%',
    overflow: 'hidden',
  },

  p: {
    color: '$gray300',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  span: {
    marginTop: 2,
    color: '$gray300',
    fontWeight: 'bold',
    display: 'block',
  },

  button: {
    marginTop: 'auto',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '$green500',
    backgroundColor: 'transparent',
    border: 0,
    cursor: 'pointer',

    transition: 'all 0.2s',

    '&:hover': {
      opacity: 0.8,
    },
  },
})

export const CloseModalButton = styled('button', {
  width: 24,
  height: 24,
  background: 'transparent',
  color: '$gray500',
  marginLeft: 'auto',
  alignContent: 'center',
  border: 0,
  cursor: 'pointer',

  transition: 'all 0.2s',

  '&:hover': {
    opacity: 0.8,
  },
})

export const CheckoutButton = styled('button', {
  marginTop: 55,
  padding: 20,
  border: 0,
  borderRadius: 8,
  fontWeight: 'bold',
  fontSize: '$md',
  color: '$white',
  backgroundColor: '$green500',

  cursor: 'pointer',
  transition: 'all 0.2s',

  '&:hover': {
    opacity: 0.8,
  },

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.8,
  },
})
