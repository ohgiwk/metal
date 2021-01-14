import React, { useState, useContext } from 'react'
// prettier-ignore
import { Button, Card, CardContent, Container, TextField, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import firebase from 'firebase'

import { AppContext } from '../contexts/AppContext'

const useStyles = makeStyles(() => ({
  login: { fontFamily: "'Lora', serif" },
  content: { textAlign: 'center' },
  textField: { width: '90%', margin: '0 0 1rem' },
  button: { marginTop: '1rem' },
  or: { fontSize: '14px', color: 'gray', marginTop: '1rem' },
}))

export default function SignUp() {
  const classes = useStyles()
  const { isLoading } = useContext(AppContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function signUp() {}

  return (
    <Container className="app-content">
      <Card>
        <CardContent className={classes.content}>
          <h2 className={classes.login}>Welcome!</h2>
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
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  signUp()
                }
              }}
            />
          </form>
          <Button
            variant="contained"
            color="primary"
            onClick={() => signUp()}
            className={classes.button}
            disabled={isLoading}
          >
            SIGN UP
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}
