import React, { useEffect, useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import * as MUI from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'

import EntryDialog from '../components/EntryDialog'
import GroupDialog from '../components/GroupDialog'
import EntryList from '../components/EntryList'
import GroupList from '../components/GroupList'
import FAB from '../components/FAB'
import { Entry } from '../common/Types'
import { ListContext } from '../contexts/ListContext'
import useHotkeys from '../hooks/useHotKeys'
import useClipboard from '../hooks/useClipboard'
import useAPI from '../hooks/useAPI'

export default function Home() {
  const { entries, selectedEntry, selectedGroup } = useContext(ListContext)
  const { copyPassword } = useClipboard()
  const { fetchEntries, fetchGroups } = useAPI()

  useEffect(() => {
    fetchEntries()
    fetchGroups()
  }, [fetchEntries, fetchGroups])

  const [searchText, setSearchText] = useState('')
  const [sort, setSort] = useState<keyof Entry>('createdAt')

  const visibleEntries = entries
    .filter((e) => (selectedGroup ? e.group === selectedGroup.id : true))
    .filter((e) => e.title.includes(searchText))
    .sort((a, b) => (a?.[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0))

  useHotkeys([
    {
      sequence: 'command+c',
      handler: () => selectedEntry && copyPassword(selectedEntry),
    },
  ])

  const props = {
    visibleEntries,
    searchText,
    sort,
    onChangeSearchField: (value: string) => setSearchText(value),
    onChangeSortSelect: (value: string) => setSort(value as keyof Entry),
  }
  return <View {...props}></View>
}

const useStyles = makeStyles((theme) => ({
  searchIcon: { margin: '18px 5px 0 0', color: 'gray' },
  sortField: { marginTop: '14px' },
  searchField: { width: '90%', margin: '0' },
  createNew: { marginLeft: 'auto' },
  noEntry: { color: 'gray', textAlign: 'center', marginTop: '2rem' },
  nested: { paddingLeft: theme.spacing(4) },
}))

interface ViewProps {
  visibleEntries: Entry[]
  searchText: string
  sort: keyof Entry
  onChangeSearchField: (value: string) => void
  onChangeSortSelect: (value: string) => void
}

const View: React.FC<ViewProps> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation()

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
              value={props.searchText}
              onChange={({ target: { value } }) =>
                props.onChangeSearchField(value)
              }
            />

            <MUI.Select
              className={classes.sortField}
              label={t('HOME.SORT')}
              value={props.sort}
              onChange={({ target: { value } }) =>
                props.onChangeSortSelect(value as string)
              }
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
              <EntryList entries={props.visibleEntries} />
            </MUI.Grid>
          </MUI.Grid>
        </MUI.CardContent>
      </MUI.Card>
      <FAB />
    </MUI.Container>
  )
}
