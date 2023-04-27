import { Default } from './pages/Default'
import { AppContextProvider } from './contexts/AppContext'
import { ListContextProvider } from './contexts/ListContext'
import { SettingContextProvider } from './contexts/SettingContext'

import { initFirebase } from './common/firebase'
import './App.css'

function App() {
  initFirebase()

  return (
    <AppContextProvider>
      <SettingContextProvider>
        <ListContextProvider>
          <Default />
        </ListContextProvider>
      </SettingContextProvider>
    </AppContextProvider>
  )
}

export default App
