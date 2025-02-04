import { styled } from '..'
import Link from 'next/link'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  minHeight: 656,

  variants: {
    size: {
      adjusted: {
        maxWidth: 'calc(100vw - ((100vw - 1180px) /2))',
        marginLeft: 'auto',
      },
      full: {
        maxWidth: '100%',
        marginLeft: 0,
      },
    },
  },
})

export const ChangeRightSlideContainer = styled('div', {
  background:
    'linear-gradient(90deg, rgba(18, 18, 20, 0.00) 0%, rgba(18, 18, 20, 0.75) 100%)',
  position: 'absolute',
  right: 0,
  height: '100vh',
  width: 136,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 16px',
})

export const ChangeLeftSlideContainer = styled('div', {
  background:
    'linear-gradient(90deg,rgba(18, 18, 20, 0.75) 0%, rgba(18, 18, 20, 0.00) 100%)',
  position: 'absolute',
  left: 0,
  height: '100vh',
  width: 136,
  padding: '0 16px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
})

export const SliderButton = styled('button', {
  border: 0,
  background: 'transparent',
  color: '$gray300',

  cursor: 'pointer',
  transition: 'all 0.2s',

  '&:hover': {
    opacity: 0.8,
    scale: 1.2,
  },
})

export const Product = styled(Link, {
  background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s',

    section: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,

      strong: {
        fontSize: '$md',
        color: '$gray100',
      },

      span: {
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300',
      },
    },

    div: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,

      padding: '0.75rem',
      backgroundColor: '$green500',
      color: '$white',
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})
