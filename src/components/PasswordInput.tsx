import React, { useState } from 'react'
// prettier-ignore
import { FormControl, IconButton, Input, InputLabel, InputAdornment } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

interface Props {
  label: string
  value: string
  className?: string
  onChange: (event: { target: { value: string } }) => void
}

export default function PasswordInput(props: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const onClick = () => setShowPassword(!showPassword)

  return (
    <FormControl className={props.className}>
      <InputLabel>{props.label}</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        value={props.value}
        onChange={props.onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={onClick}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        autoComplete="off"
      />
    </FormControl>
  )
}
