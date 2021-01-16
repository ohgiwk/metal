import React from 'react'
import PasswordInput from './'

const config = {
  title: 'PasswordInput',
}
export default config

const props = {
  label: 'password',
  value: '',
  onChange: () => {},
}
export const defaultPasswordInput = () => <PasswordInput {...props} />
