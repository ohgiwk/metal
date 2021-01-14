import React, { createContext, useState } from 'react'

type SnackBarState = {
  open: boolean
  message?: string
  type?: 'success' | 'error'
}

type ConfirmDialogState = {
  open: boolean
  title?: string
  text?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  onClickPrimaryButton?: () => void
  onClickSecondaryButton?: () => void
}

interface State {
  isAppLoading: boolean
  setIsAppLoading: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isAuth: boolean
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
  snackBar: SnackBarState
  setSnackBar: React.Dispatch<React.SetStateAction<SnackBarState>>
  confirmDialog: ConfirmDialogState
  setConfirmDialog: React.Dispatch<React.SetStateAction<ConfirmDialogState>>
  infoDialog: boolean
  setInfoDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const AppContext = createContext<State>({} as State)

function AppContextProvider(props: { children?: React.ReactNode }) {
  const [isAppLoading, setIsAppLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [snackBar, setSnackBar] = useState({ open: false })
  const [confirmDialog, setConfirmDialog] = useState({ open: false })
  const [infoDialog, setInfoDialog] = useState(false)

  return (
    <AppContext.Provider
      value={{
        isAppLoading,
        setIsAppLoading,
        isLoading,
        setIsLoading,
        isAuth,
        setIsAuth,
        snackBar,
        setSnackBar,
        confirmDialog,
        setConfirmDialog,
        infoDialog,
        setInfoDialog,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
