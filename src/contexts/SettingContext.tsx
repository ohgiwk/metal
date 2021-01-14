import React, { createContext, useState } from 'react'

type ThemeState = 'light' | 'dark'
interface State {
  theme: ThemeState
  setTheme: React.Dispatch<React.SetStateAction<ThemeState>>
  language: string
  setLanguage: React.Dispatch<React.SetStateAction<string>>
  autoLock: boolean
  setAutoLock: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingContext = createContext<State>({} as State)

function SettingContextProvider(props: { children?: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeState>('light')
  const [language, setLanguage] = useState('ja')
  const [autoLock, setAutoLock] = useState(true)

  return (
    <SettingContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        autoLock,
        setAutoLock,
      }}
    >
      {props.children}
    </SettingContext.Provider>
  )
}

export { SettingContext, SettingContextProvider }
