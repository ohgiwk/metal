import { useContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { AppContext } from '../contexts/AppContext'

/**
 * 認証に関する処理を行うカスタムフック
 *
 * @return {*}
 */
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

  /**
   * サインアップを行う
   * @param email
   * @param password
   */
  async function signUp(email: string, password: string) {
    // ローディング表示
    setIsLoading(true)

    try {
      await auth.createUserWithEmailAndPassword(email, password)

      // サインアップ成功ダイアログ表示
      setSnackBar({ open: true, message: 'ようこそ Metalへ', type: 'success' })
      // ローディング非表示
      setIsLoading(false)
      // ホームに遷移
      history.replace('/')
    } catch (e) {
      console.log(e)
      setIsLoading(false)
      // サインアップ失敗ダイアログ表示
      setSnackBar({ open: true, message: '失敗しました', type: 'error' })
    }
  }

  /**
   * ログインを行う
   * @param username
   * @param password
   */
  async function login(username: string, password: string) {
    // ローディング表示
    setIsLoading(true)

    try {
      await auth.signInWithEmailAndPassword(username, password)

      // ログイン成功ダイアログ表示
      setSnackBar({ open: true, message: t('LOGGED_IN'), type: 'success' })

      // ローディング非表示
      setIsLoading(false)
      // ホームに遷移
      history.replace('/login')
    } catch (e) {
      setIsLoading(false)
      // ログイン失敗ダイアログ表示
      setSnackBar({
        open: true,
        message: t('LOGIN_FAILED'),
        type: 'error',
      })
    }
  }

  /**
   * ログアウトを行う
   */
  function logout() {
    auth.signOut()
    setSnackBar({ open: true, message: t('LOGGED_OUT'), type: 'success' })
    history.replace('/login')
  }

  return { initAuth, signUp, login, logout }
}
export default useAuth
