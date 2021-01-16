import { useContext } from 'react'
import firebase from 'firebase'
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

  function initAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      setIsAuth(!!user)
      setCurrentUser(user ?? undefined)
      setIsAppLoading(false)
    })
  }

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

  function logout() {
    firebase.auth().signOut()
    setSnackBar({ open: true, message: t('LOGGED_OUT'), type: 'success' })
    history.replace('/login')
  }

  return { initAuth, login, logout }
}
export default useAuth
