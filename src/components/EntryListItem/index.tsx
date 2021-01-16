import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
// prettier-ignore
import { IconButton, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import KeyIcon from '@material-ui/icons/VpnKey'
import DeleteIcon from '@material-ui/icons/Delete'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import AssignmentIcon from '@material-ui/icons/Assignment'

import { Entry } from '../../common/Types'
import { AppContext } from '../../contexts/AppContext'
import { ListContext } from '../../contexts/ListContext'
import useClipboard from '../../hooks/useClipboard'
import OptionMenu from '../OptionMenu'
import useAPI from '../../hooks/useAPI'

const EntryListItem: React.FC<{
  entry: Entry
  className?: string
  selected?: boolean
  onClick?: () => void
}> = (props) => {
  const { t } = useTranslation()
  const { copyPassword } = useClipboard()
  const { setConfirmDialog } = useContext(AppContext)
  const { setSelectedEntry, setEntryDialog } = useContext(ListContext)
  const { deleteEntry } = useAPI()

  function editEntry() {
    setSelectedEntry(props.entry)
    setEntryDialog(true)
  }

  function onClickDeleteEntry() {
    const dialogText = {
      title: 'エントリーの削除',
      text: `エントリー「${props.entry.title}」を削除してもよろしいですか？`,
      primaryButtonText: t('DELETE'),
      secondaryButtonText: t('CANCEL'),
    }

    setConfirmDialog({
      open: true,
      ...dialogText,
      onClickPrimaryButton: () => {
        deleteEntry(props.entry)
        setConfirmDialog({ open: false })
      },
      onClickSecondaryButton: () =>
        setConfirmDialog({ ...dialogText, open: false }),
    })
  }

  return (
    <ListItem
      button
      className={props.className}
      selected={props.selected}
      onClick={props.onClick}
      onDoubleClick={editEntry}
    >
      <ListItemIcon>
        <KeyIcon />
      </ListItemIcon>
      <ListItemText primary={props.entry.title} />
      <ListItemSecondaryAction>
        <IconButton onClick={() => copyPassword(props.entry)}>
          <AssignmentIcon />
        </IconButton>

        <OptionMenu
          items={[
            {
              label: 'Clone Entry',
              Icon: <FileCopyIcon fontSize="small" />,
              onClick: () => {},
            },
            {
              label: 'Delete Entry',
              Icon: <DeleteIcon fontSize="small" />,
              onClick: onClickDeleteEntry,
            },
          ]}
        />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default EntryListItem
