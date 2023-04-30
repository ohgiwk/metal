import { useContext, useEffect, useState, lazy, Suspense } from 'react'
// prettier-ignore
import { BrowserRouter, Switch, Route, Redirect, RouteProps, } from 'react-router-dom'
import { Backdrop, CircularProgress, CssBaseline } from '@material-ui/core'
// prettier-ignore
import { createTheme, ThemeProvider, makeStyles, } from '@material-ui/core/styles'

import {
  DrawerMenu,
  AppHeader,
  AppFooter,
  InfoDialog,
  SnackBar,
  ConfirmDialog,
} from '../components'
import { AppContext, SettingContext } from '../contexts'
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
  const {
    isAuth,
    isAppLoading,
    isLoading,
    snackBar,
    setSnackBar,
    confirmDialog,
  } = useContext(AppContext)
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
                {/* ヘッダ */}
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
                  {/* ログイン画面 */}
                  <Route
                    path="/login"
                    render={() => (isAuth ? <Redirect to="/" /> : <Login />)}
                  />
                  {/* サインアップ画面 */}
                  <Route exact path="/signUp" children={<SignUp />} />
                  {/* ホーム画面 */}
                  <PrivateRoute exact path="/" children={<Home />} />
                  {/* 設定画面 */}
                  <PrivateRoute exact path="/setting" children={<Setting />} />
                </Switch>
              </Suspense>

              {/* フッター */}
              <AppFooter />
            </BrowserRouter>
          )
        }
      })()}
    </ThemeProvider>
  )
}
