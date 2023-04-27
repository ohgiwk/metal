import React, { useState, useContext, KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
// prettier-ignore
import { Link, Button, Card, CardContent, Container, TextField, Grid } from '@material-ui/core'

import clsx from 'clsx'

import { AppContext } from '../../contexts/AppContext'
import useAuth from '../../hooks/useAuth'
import { useStyles } from './style'
import SNSLoginButton from '../../components/SNSLoginButton'

/**
 * ログイン画面
 * @returns
 */
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

/**
 * ログイン画面のView
 * @param props
 * @returns
 */
const View: React.FC<ViewProps> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Container className={classes.container}>
      <Card>
        <CardContent className={classes.content}>
          <h2 className={classes.login}>Login</h2>
          <Grid container>
            <Grid item xs={12} md={6}>
              <form>
                <TextField
                  label={t('USERNAME')}
                  variant="outlined"
                  className={classes.textField}
                  value={props.username}
                  onChange={({ target: { value } }) =>
                    props.onChangeUsername(value)
                  }
                  InputProps={{ className: 'username' }}
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
                  InputProps={{ className: 'password' }}
                />
              </form>
              <div>
                <Link
                  component={RouterLink}
                  className={classes.forgotPassword}
                  to="/forgotPassword"
                >
                  パスワードを忘れた場合
                </Link>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={props.onClickLoginButton}
                className={clsx(classes.button, 'login-btn')}
                disabled={props.isLoading}
              >
                {t('LOGIN')}
              </Button>
              <div className={classes.or}>or</div>
              <Button component={RouterLink} to="/signUp" color="primary">
                {t('CREATE_ACCOUNT')}
              </Button>
            </Grid>

            <Grid item xs={12} md={5} className={classes.sns}>
              <SNSLoginButton sns="facebook" isLoading={props.isLoading} />
              <SNSLoginButton sns="twitter" isLoading={props.isLoading} />
              <SNSLoginButton sns="github" isLoading={props.isLoading} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}
