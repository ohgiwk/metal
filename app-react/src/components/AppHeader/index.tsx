import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// prettier-ignore
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'

import { AppContext } from '../../contexts/AppContext'
import useAuth from '../../hooks/useAuth'

const useStyles = makeStyles(() => ({
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
  const { t } = useTranslation()
  const { isAuth, setConfirmDialog } = useContext(AppContext)
  const { logout } = useAuth()

  const dialogText = {
    title: t('LOGOUT'),
    text: t('CONFIRM_LOGOUT'),
    primaryButtonText: t('LOGOUT'),
    secondaryButtonText: t('CANCEL'),
  }

  const handleClose = () => setConfirmDialog({ ...dialogText, open: false })

  const confirmLogout = () => {
    setConfirmDialog({
      open: true,
      ...dialogText,
      onClickPrimaryButton: () => {
        logout()
        handleClose()
      },
      onClickSecondaryButton: handleClose,
    })
  }

  return (
    <AppBar elevation={0} color="inherit">
      <Toolbar>
        <IconButton onClick={() => props.openDrawer(true)}>
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
