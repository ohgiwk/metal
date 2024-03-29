import { useContext, useEffect, useState, lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom'
import { Backdrop, CircularProgress, CssBaseline } from '@material-ui/core'
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles'

import DrawerMenu from '../components/DrawerMenu'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import InfoDialog from '../components/InfoDialog'
import SnackBar from '../components/SnackBar'
import ConfirmDialog from '../components/ConfirmDialog'
import { AppContext } from '../contexts/AppContext'
import { SettingContext } from '../contexts/SettingContext'
import useAuth from '../hooks/useAuth'

import AppLoading from './AppLoading'
import Home from './Home'

const Setting = lazy(() => import('./Setting'))
const Login = lazy(() => import('./Login'))
const SignUp = lazy(() => import('./Signup'))

const useStyles = makeStyles((theme) => ({
  backdrop: { zIndex: theme.zIndex.modal + 1, flexDirection: 'column' },
}))

/**
 * ログインしていない場合はログイン画面にリダイレクトするルート
 * @param props
 * @returns
 */
const PrivateRoute = (props: RouteProps) => {
  const { isAuth } = useContext(AppContext)
  return isAuth ? <Route {...props} /> : <Redirect to="/login" />
}

export function Default() {
  const classes = useStyles()
  const { initAuth } = useAuth()
  const [drawer, setDrawer] = useState(false)
  // prettier-ignore
  const { isAuth, isAppLoading, isLoading, snackBar, setSnackBar, confirmDialog } = useContext(AppContext)
  const { theme } = useContext(SettingContext)

  useEffect(() => initAuth(), [initAuth])

  const muiTheme = createTheme({
    palette: {
      type: theme,
      primary: { main: theme === 'dark' ? '#4dd0e1' : '#e91e63' },
    },
  })

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {(() => {
        if (isAppLoading) {
          return <AppLoading />
        } else {
          return (
            <BrowserRouter>
              <Suspense fallback={<AppLoading />}>
                <DrawerMenu open={drawer} setOpen={setDrawer} />
                <AppHeader openDrawer={setDrawer} />
                <InfoDialog />

                <SnackBar
                  open={snackBar.open}
                  message={snackBar.message}
                  severity={snackBar.type}
                  onClose={() => setSnackBar({ ...snackBar, open: false })}
                />

                <ConfirmDialog {...confirmDialog} />

                <Backdrop className={classes.backdrop} open={isLoading}>
                  <CircularProgress color="inherit" />
                </Backdrop>

                <Switch>
                  <Route
                    path="/login"
                    render={() => (isAuth ? <Redirect to="/" /> : <Login />)}
                  />
                  <Route exact path="/signUp" children={<SignUp />} />

                  <Route exact path="/" children={<Home />} />

                  <PrivateRoute exact path="/setting" children={<Setting />} />
                </Switch>
              </Suspense>
              <AppFooter />
            </BrowserRouter>
          )
        }
      })()}
    </ThemeProvider>
  )
}
