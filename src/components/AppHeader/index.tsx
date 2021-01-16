import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// prettier-ignore
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import firebase from 'firebase'

import { AppContext } from '../../contexts/AppContext'

const useStyles = makeStyles(() => ({
  appBar: {},
  button: {},
  title: {
    marginLeft: 'calc(50% - 86px)',
    fontFamily: "'Lora', serif",
    fontSize: '32px',
  },
  login: { marginLeft: 'auto' },
}))

const AppHeader: React.FC<{
  openDrawer: Function
}> = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation()

  const { isAuth, setSnackBar, setConfirmDialog } = useContext(AppContext)

  function logout() {
    firebase.auth().signOut()
    setSnackBar({ open: true, message: t('LOGGED_OUT'), type: 'success' })
    history.replace('/login')
    handleClose()
  }

  const dialogText = {
    title: t('LOGOUT'),
    text: t('CONFIRM_LOGOUT'),
    primaryButtonText: t('LOGOUT'),
    secondaryButtonText: t('CANCEL'),
  }

  const handleClose = () => {
    setConfirmDialog({ ...dialogText, open: false })
  }
  const confirmLogout = () => {
    setConfirmDialog({
      open: true,
      ...dialogText,
      onClickPrimaryButton: logout,
      onClickSecondaryButton: handleClose,
    })
  }

  return (
    <AppBar elevation={0} color="inherit" className={classes.appBar}>
      <Toolbar>
        <IconButton
          onClick={() => props.openDrawer(true)}
          className={classes.button}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h1" className={classes.title}>
          Metal
        </Typography>

        {!isAuth ? (
          <Button
            color="inherit"
            component={Link}
            to="/login"
            className={classes.login}
          >
            {t('LOGIN')}
          </Button>
        ) : (
          <Button
            color="inherit"
            className={classes.login}
            onClick={confirmLogout}
          >
            {t('LOGOUT')}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader
