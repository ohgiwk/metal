import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import * as MUI from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import firebase from 'firebase'

import EntryDialog from '../components/EntryDialog'
import GroupDialog from '../components/GroupDialog'
import EntryListItem from '../components/EntryListItem'
import GroupList from '../components/GroupList'
import FAB from '../components/FAB'
import { Entry, Group } from '../common/Types'
import { ListContext } from '../contexts/ListContext'

const useStyles = makeStyles((theme) => ({
  searchIcon: { margin: '18px 5px 0 0', color: 'gray' },
  sortField: { marginTop: '14px' },
  searchField: { width: '90%', margin: '0' },
  createNew: { marginLeft: 'auto' },
  noEntry: { color: 'gray', textAlign: 'center', marginTop: '2rem' },
  nested: { paddingLeft: theme.spacing(4) },
}))

export default function Home() {
  const classes = useStyles()
  const { t } = useTranslation()

  const {
    setGroups,
    entries,
    setEntries,
    selectedEntry,
    setSelectedEntry,
    selectedGroup,
  } = useContext(ListContext)

  const [searchText, setSearchText] = useState('')
  const [sort, setSort] = useState<keyof Entry>('createdAt')
  // const [groupOpens, setGroupOpens] = useState<boolean[]>([])

  const fetchEntries = useCallback(async () => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth()
    const doc = db.collection('passwords').doc(currentUser?.uid)
    const { docs: _entries } = await doc.collection('entries').get()
    const { docs: _groups } = await doc.collection('groups').get()

    const entries = _entries.map((d) => ({ id: d.id, ...d.data() } as Entry))
    const groups = _groups.map((d) => ({ id: d.id, ...d.data() } as Group))

    setGroups(groups)
    setEntries(entries)
    // setGroupOpens(new Array(groups.length).fill(false))
  }, [setGroups, setEntries])

  useEffect(() => {
    fetchEntries()
  }, [fetchEntries])

  const visibleEntries = entries
    .filter((e) => (selectedGroup ? e.group === selectedGroup.id : true))
    .filter((e) => e.title.includes(searchText))
    .sort((a, b) => (a?.[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0))

  return (
    <MUI.Container className="app-content">
      <EntryDialog />
      <GroupDialog />
      <MUI.Card>
        <MUI.CardContent>
          <MUI.CardActions>
            <SearchIcon className={classes.searchIcon} />
            <MUI.TextField
              label={t('HOME.SEARCH')}
              margin="dense"
              className={classes.searchField}
              value={searchText}
              onChange={({ target: { value } }) => setSearchText(value)}
            />

            <MUI.Select
              className={classes.sortField}
              label={t('HOME.SORT')}
              value={sort}
              onChange={({ target: { value } }) => {
                setSort(value as keyof Entry)
              }}
            >
              <MUI.MenuItem value="createdAt">
                {t('HOME.CREATED_DATE')}
              </MUI.MenuItem>
              <MUI.MenuItem value="updatedAt">
                {t('HOME.UPDATE_DATE')}
              </MUI.MenuItem>
            </MUI.Select>
          </MUI.CardActions>

          <MUI.Grid container spacing={3}>
            <MUI.Grid item xs={12} md={3}>
              <GroupList />
            </MUI.Grid>

            <MUI.Grid item xs={12} md={9}>
              <MUI.List
                subheader={
                  <MUI.ListSubheader>
                    {t('HOME.ENTRIES')} ({visibleEntries.length})
                  </MUI.ListSubheader>
                }
              >
                {visibleEntries.map((entry, i) => (
                  <EntryListItem
                    key={i}
                    entry={entry}
                    onClick={() => {
                      setSelectedEntry(entry)
                    }}
                    selected={selectedEntry?.id === entry.id}
                  />
                ))}
                {visibleEntries.length === 0 && (
                  <MUI.ListItem>
                    <MUI.ListItemText
                      primary={t('NO_ENTRY')}
                      className={classes.noEntry}
                    />
                  </MUI.ListItem>
                )}
              </MUI.List>
            </MUI.Grid>
          </MUI.Grid>
        </MUI.CardContent>
      </MUI.Card>
      <FAB />
    </MUI.Container>
  )
}
