import React, { createContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

type ThemeState = 'light' | 'dark'
interface State {
  theme: ThemeState
  setTheme: React.Dispatch<React.SetStateAction<ThemeState>>
  language: string
  setLanguage: React.Dispatch<React.SetStateAction<string>>
  autoLock: boolean
  setAutoLock: React.Dispatch<React.SetStateAction<boolean>>
  autoLockTime: number
  setAutoLockTime: React.Dispatch<React.SetStateAction<number>>
  passwordExpiration: boolean
  setPasswordExpiration: React.Dispatch<React.SetStateAction<boolean>>
  daysToExpire: number
  setDaysToExpire: React.Dispatch<React.SetStateAction<number>>
}

const SettingContext = createContext<State>({} as State)

function SettingContextProvider(props: { children?: React.ReactNode }) {
  const [storage] = useLocalStorage('USER_SETTING', {
    theme: 'light' as ThemeState,
    language: 'ja',
    autoLock: true,
    autoLockTime: 300,
    passwordExpiration: true,
    daysToExpire: 180,
  })

  const [theme, setTheme] = useState<ThemeState>(storage.theme)
  const [language, setLanguage] = useState(storage.language)
  const [autoLock, setAutoLock] = useState(storage.autoLock)
  const [autoLockTime, setAutoLockTime] = useState(storage.autoLockTime)
  const [passwordExpiration, setPasswordExpiration] = useState(
    storage.passwordExpiration
  )
  const [daysToExpire, setDaysToExpire] = useState(storage.daysToExpire)

  return (
    <SettingContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        autoLock,
        setAutoLock,
        autoLockTime,
        setAutoLockTime,
        passwordExpiration,
        setPasswordExpiration,
        daysToExpire,
        setDaysToExpire,
      }}
    >
      {props.children}
    </SettingContext.Provider>
  )
}

export { SettingContext, SettingContextProvider }
