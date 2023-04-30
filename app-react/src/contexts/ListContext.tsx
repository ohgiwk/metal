import React, { createContext, useState } from 'react'
import { Entry, Group } from '../common/Types'

interface State {
  groups: Group[]
  entries: Entry[]
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
  selectedGroup: Group | undefined
  setSelectedGroup: React.Dispatch<React.SetStateAction<Group | undefined>>
  selectedEntry: Entry | undefined
  setSelectedEntry: React.Dispatch<React.SetStateAction<Entry | undefined>>
  entryDialog: boolean
  setEntryDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const ListContext = createContext<State>({} as State)

function ListContextProvider(props: { children?: React.ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>()
  const [selectedEntry, setSelectedEntry] = useState<Entry | undefined>()
  const [entryDialog, setEntryDialog] = useState(false)

  return (
    <ListContext.Provider
      value={{
        get groups(): Group[] {
          return this.entries
            .map((e) => e.group)
            .filter((g) => g)
            .filter((g, i, self) => self.indexOf(g) === i)
        },
        entries,
        setEntries,
        selectedGroup,
        setSelectedGroup,
        selectedEntry,
        setSelectedEntry,
        entryDialog,
        setEntryDialog,
      }}
    >
      {props.children}
    </ListContext.Provider>
  )
}

export { ListContext, ListContextProvider }
