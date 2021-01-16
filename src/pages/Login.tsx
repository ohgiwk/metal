import React, { useState, useContext, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
// prettier-ignore
import { Button, Card, CardContent, Container, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { AppContext } from '../contexts/AppContext'
import useAuth from '../hooks/useAuth'

export default function Login() {
  const { login } = useAuth()
  const { isLoading } = useContext(AppContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const props = {
    isLoading,
    username,
    password,
    onChangeUsername: (value: string) => setUsername(value),
    onChangePassword: (value: string) => setPassword(value),
    login,
    onClickLoginButton: () => props.login(props.username, props.password),
    onKeypressPassword: (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        login(username, password)
      }
    },
  }
  return <View {...props}></View>
}

const useStyles = makeStyles(() => ({
  login: { fontFamily: "'Lora', serif" },
  content: { textAlign: 'center' },
  textField: { width: '90%', margin: '0 0 1rem' },
  button: { marginTop: '1rem' },
  or: { fontSize: '14px', color: 'gray', marginTop: '1rem' },
}))

interface ViewProps {
  isLoading: boolean
  username: string
  onChangeUsername: (value: string) => void
  password: string
  onChangePassword: (value: string) => void
  login: Function
  onClickLoginButton: () => void
  onKeypressPassword: (event: KeyboardEvent<HTMLDivElement>) => void
}

const View: React.FC<ViewProps> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Container className="app-content">
      <Card>
        <CardContent className={classes.content}>
          <h2 className={classes.login}>Login</h2>
          <form>
            <TextField
              label={t('USERNAME')}
              variant="outlined"
              className={classes.textField}
              value={props.username}
              onChange={({ target: { value } }) =>
                props.onChangeUsername(value)
              }
            />
            <TextField
              label={t('PASSWORD')}
              variant="outlined"
              type="password"
              className={classes.textField}
              value={props.password}
              onChange={({ target: { value } }) =>
                props.onChangePassword(value)
              }
              onKeyPress={props.onKeypressPassword}
            />
          </form>
          <Button
            variant="contained"
            color="primary"
            onClick={props.onClickLoginButton}
            className={classes.button}
            disabled={props.isLoading}
          >
            {t('LOGIN')}
          </Button>
          <div className={classes.or}>or</div>
          <Button component={Link} to="/signUp" color="primary">
            {t('CREATE_ACCOUNT')}
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}
