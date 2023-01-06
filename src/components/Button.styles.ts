import styled, { css } from 'styled-components'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
  warning: 'yellow',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  background-color: ${(props) => props.theme['green-500']};
  /* ${(props) =>
    css`
      background-color: ${buttonVariants[props.variant]};
    `} */
`
