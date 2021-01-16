import React, { useContext, useEffect, useState } from 'react'
// prettier-ignore
import { BrowserRouter, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import { Backdrop, CircularProgress, CssBaseline } from '@material-ui/core'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'

import Home from '../pages/Home'
import Setting from '../pages/Setting'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'

import DrawerMenu from '../components/DrawerMenu'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import InfoDialog from '../components/InfoDialog'
import SnackBar from '../components/SnackBar'
import ConfirmDialog from '../components/ConfirmDialog'
import { AppContext } from '../contexts/AppContext'
import { SettingContext } from '../contexts/SettingContext'
import useAuth from '../hooks/useAuth'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    flexDirection: 'column',
  },
  h1: {
    fontSize: '4rem',
    fontFamily: "'Lora', serif",
    marginBottom: '3rem',
    opacity: '0.3',
    letterSpacing: '2px',
  },
}))

const PrivateRoute = (props: RouteProps) => {
  const { isAuth } = useContext(AppContext)
  return isAuth ? <Route {...props} /> : <Redirect to="/login" />
}

export function Default() {
  const classes = useStyles()
  const { initAuth } = useAuth()

  const [drawer, setDrawer] = useState(false)

  const {
    isAuth,
    isAppLoading,
    isLoading,
    snackBar,
    setSnackBar,
    confirmDialog: CD,
  } = useContext(AppContext)
  const { theme } = useContext(SettingContext)

  useEffect(() => initAuth(), [initAuth])

  const muiTheme = createMuiTheme({
    palette: {
      type: theme,
    },
  })

  if (isAppLoading) {
    return (
      <Backdrop
        style={{ color: theme === 'dark' ? '#443c46' : '#fff' }}
        className={classes.backdrop}
        open={isAppLoading}
      >
        <h1 className={classes.h1}>Metal</h1>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  } else {
    return (
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />

        <BrowserRouter>
          <DrawerMenu open={drawer} setOpen={setDrawer} />
          <AppHeader openDrawer={setDrawer} />
          <InfoDialog />

          <SnackBar
            open={snackBar.open}
            message={snackBar.message}
            severity={snackBar.type}
            onClose={() => setSnackBar({ ...snackBar, open: false })}
          />

          <ConfirmDialog
            open={CD.open}
            title={CD.title}
            text={CD.text}
            primaryButtonText={CD.primaryButtonText}
            secondaryButtonText={CD.secondaryButtonText}
            onClickPrimaryButton={CD.onClickPrimaryButton}
            onClickSecondaryButton={CD.onClickSecondaryButton}
          />

          <Backdrop className={classes.backdrop} open={isLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>

          <Switch>
            <Route
              path="/login"
              render={() => (isAuth ? <Redirect to="/" /> : <Login />)}
            />
            <Route exact path="/signUp" children={<SignUp />} />
            <PrivateRoute exact path="/" children={<Home />} />
            <PrivateRoute exact path="/setting" children={<Setting />} />
          </Switch>
          <AppFooter />
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}
