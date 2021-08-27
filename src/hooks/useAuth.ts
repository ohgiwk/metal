import { useContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { AppContext } from '../contexts/AppContext'

const useAuth = () => {
  const history = useHistory()
  const { t } = useTranslation()
  const {
    setIsAuth,
    setCurrentUser,
    setIsAppLoading,
    setSnackBar,
    setIsLoading,
  } = useContext(AppContext)

  const auth = firebase.auth()

  function initAuth() {
    auth.onAuthStateChanged((user) => {
      setIsAuth(!!user)
      setCurrentUser(user ?? undefined)
      setIsAppLoading(false)
    })
  }

  async function signUp(email: string, password: string) {
    setIsLoading(true)

    try {
      await auth.createUserWithEmailAndPassword(email, password)

      setSnackBar({ open: true, message: 'ようこそ Metalへ', type: 'success' })
      setIsLoading(false)
      history.replace('/')
    } catch (e) {
      console.log(e)
      setIsLoading(false)
      setSnackBar({ open: true, message: '失敗しました', type: 'error' })
    }
  }

  async function login(username: string, password: string) {
    setIsLoading(true)

    try {
      await auth.signInWithEmailAndPassword(username, password)

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

  function logout() {
    auth.signOut()
    setSnackBar({ open: true, message: t('LOGGED_OUT'), type: 'success' })
    history.replace('/login')
  }

  return { initAuth, signUp, login, logout }
}
export default useAuth
