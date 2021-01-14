import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useHistory } from 'react-router-dom'
// prettier-ignore
import { Button, Card, CardContent, Container, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import firebase from 'firebase'

import { AppContext } from '../contexts/AppContext'

const useStyles = makeStyles(() => ({
  login: { fontFamily: "'Lora', serif" },
  content: { textAlign: 'center' },
  textField: { width: '90%', margin: '0 0 1rem' },
  button: { marginTop: '1rem' },
  or: { fontSize: '14px', color: 'gray', marginTop: '1rem' },
}))

export default function Login() {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation()

  const { isLoading, setIsLoading, setSnackBar } = useContext(AppContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function login(username: string, password: string) {
    setIsLoading(true)
    try {
      await firebase.auth().signInWithEmailAndPassword(username, password)

      setSnackBar({ open: true, message: t('LOGGED_IN'), type: 'success' })
      setIsLoading(false)
      history.replace('/')
    } catch (e) {
      setIsLoading(false)
      setSnackBar({
        open: true,
        message: t('LOGIN_FAILED'),
        type: 'error',
      })
    }
  }

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
              value={username}
              onChange={({ target: { value } }) => setUsername(value)}
            />
            <TextField
              label={t('PASSWORD')}
              variant="outlined"
              type="password"
              className={classes.textField}
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  login(username, password)
                }
              }}
            />
          </form>
          <Button
            variant="contained"
            color="primary"
            onClick={() => login(username, password)}
            className={classes.button}
            disabled={isLoading}
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
