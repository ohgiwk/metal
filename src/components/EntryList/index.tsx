import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Entry } from '../../common/Types'
import EntryListItem from '../EntryListItem'
import { ListContext } from '../../contexts/ListContext'

const useStyles = makeStyles(() => ({
  noEntry: { color: 'gray', textAlign: 'center', marginTop: '2rem' },
}))

const EntryList: React.FC<{
  entries: Entry[]
}> = ({ entries }) => {
  const { t } = useTranslation()
  const classes = useStyles()

  const { selectedEntry, setSelectedEntry } = useContext(ListContext)

  return (
    <List
      subheader={
        <ListSubheader>
          {t('HOME.ENTRIES')} ({entries.length})
        </ListSubheader>
      }
    >
      {entries.map((entry, i) => (
        <EntryListItem
          key={i}
          entry={entry}
          onClick={() => {
            setSelectedEntry(entry)
          }}
          selected={selectedEntry?.id === entry.id}
        />
      ))}
      {entries.length === 0 && (
        <ListItem>
          <ListItemText primary={t('NO_ENTRY')} className={classes.noEntry} />
        </ListItem>
      )}
    </List>
  )
}

export default EntryList
