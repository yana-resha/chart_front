import { InputHTMLAttributes, ReactNode } from 'react'

import { CheckboxContainer, Input } from './index.linaria'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode
}

export const Checkbox = ({ label, ...props }: CheckboxProps) => (
  <CheckboxContainer>
    <Input
      {...props}
      type="checkbox"
    />
    {label}
  </CheckboxContainer>
)
