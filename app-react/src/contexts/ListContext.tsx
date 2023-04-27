import React, { createContext, useState } from 'react'
import { Entry, Group } from '../common/Types'

interface State {
  groups: Group[]
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>
  entries: Entry[]
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
  selectedGroup: Group | undefined
  setSelectedGroup: React.Dispatch<React.SetStateAction<Group | undefined>>
  selectedEntry: Entry | undefined
  setSelectedEntry: React.Dispatch<React.SetStateAction<Entry | undefined>>
  entryDialog: boolean
  setEntryDialog: React.Dispatch<React.SetStateAction<boolean>>

  groupDialog: boolean
  setGroupDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const ListContext = createContext<State>({} as State)

function ListContextProvider(props: { children?: React.ReactNode }) {
  const [groups, setGroups] = useState<Group[]>([])
  const [entries, setEntries] = useState<Entry[]>([])
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>()
  const [selectedEntry, setSelectedEntry] = useState<Entry | undefined>()
  const [entryDialog, setEntryDialog] = useState(false)
  const [groupDialog, setGroupDialog] = useState(false)

  return (
    <ListContext.Provider
      value={{
        groups,
        setGroups,
        entries,
        setEntries,
        selectedGroup,
        setSelectedGroup,
        selectedEntry,
        setSelectedEntry,
        entryDialog,
        setEntryDialog,
        groupDialog,
        setGroupDialog,
      }}
    >
      {props.children}
    </ListContext.Provider>
  )
}

export { ListContext, ListContextProvider }
