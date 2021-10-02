import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
} from '@material-ui/core'
import KeyIcon from '@material-ui/icons/VpnKey'
import DeleteIcon from '@material-ui/icons/Delete'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import moment from 'moment'

import { Entry } from '../../common/Types'
import { AppContext } from '../../contexts/AppContext'
import { ListContext } from '../../contexts/ListContext'
import useClipboard from '../../hooks/useClipboard'
import OptionMenu from '../OptionMenu'
import useAPI from '../../hooks/useAPI'
import { SettingContext } from '../../contexts/SettingContext'

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
  const { daysToExpire } = useContext(SettingContext)
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

  const isExpired = moment().isAfter(
    moment(props.entry.updatedAt).add(daysToExpire, 'days')
  )

  return (
    <ListItem
      button
      className={props.className}
      selected={props.selected}
      onClick={props.onClick}
      onDoubleClick={editEntry}
    >
      <ListItemIcon>
        {isExpired ? <ErrorOutlineIcon color="error" /> : <KeyIcon />}
      </ListItemIcon>
      <ListItemText primary={props.entry.title} />
      <ListItemSecondaryAction>
        <Tooltip title="Copy To Clipboard">
          <IconButton onClick={() => copyPassword(props.entry)}>
            <AssignmentIcon />
          </IconButton>
        </Tooltip>

        <OptionMenu
          items={[
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
