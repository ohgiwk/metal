import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// prettier-ignore
import { Button, Card, CardContent, Container, TextField, } from '@material-ui/core'
import { useStyles } from './style'

import { AppContext } from '../../contexts/AppContext'
import useAuth from '../../hooks/useAuth'

export default function SignUp() {
  const classes = useStyles()
  const { t } = useTranslation()
  const { isLoading } = useContext(AppContext)
  const { signUp } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function onClickSignUp() {
    signUp(username, password)
  }

  return (
    <Container className={classes.container}>
      <Card>
        <CardContent className={classes.content}>
          <h2 className={classes.login}>Sign Up</h2>
          <form>
            <TextField
              label="Username"
              variant="outlined"
              className={classes.textField}
              value={username}
              onChange={({ target: { value } }) => setUsername(value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              className={classes.textField}
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
          </form>

          <Button
            variant="contained"
            color="primary"
            onClick={onClickSignUp}
            className={classes.button}
            disabled={isLoading}
          >
            ユーザー登録
          </Button>
          <div className={classes.or}>or</div>
          <Button component={Link} to="/login" color="primary">
            {t('LOGIN')}
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}
