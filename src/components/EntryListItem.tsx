import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
// prettier-ignore
import {
  IconButton, ListItem, ListItemIcon, ListItemText,
  ListItemSecondaryAction, Menu, MenuItem, Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import KeyIcon from '@material-ui/icons/VpnKey'
import DeleteIcon from '@material-ui/icons/Delete'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import AssignmentIcon from '@material-ui/icons/Assignment'
import copy from 'copy-to-clipboard'
import firebase from 'firebase'

import { Entry } from '../common/Types'
import { AppContext } from '../contexts/AppContext'
import { ListContext } from '../contexts/ListContext'

const useStyles = makeStyles(() => ({
  menuItemIcon: { minWidth: '30px' },
}))

const EntryListItem: React.FC<{
  entry: Entry
  className?: string
  selected?: boolean
  onClick?: () => void
}> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { setSnackBar, setIsLoading, setConfirmDialog } = useContext(AppContext)
  const { entries, setEntries, setSelectedEntry, setEntryDialog } = useContext(
    ListContext
  )

  function copyClipBoard() {
    copy(props.entry.password)
    setSnackBar({ open: true, type: 'success', message: t('COPIED') })
  }

  function editEntry() {
    setSelectedEntry(props.entry)
    setEntryDialog(true)
  }

  function onClickDeleteEntry() {
    handleClose()
    const dialogText = {
      title: 'エントリーの削除',
      text: `エントリー「${props.entry.title}」を削除してもよろしいですか？`,
      primaryButtonText: t('DELETE'),
      secondaryButtonText: t('CANCEL'),
    }

    setConfirmDialog({
      open: true,
      ...dialogText,
      onClickPrimaryButton: () => deleteEntry(props.entry),
      onClickSecondaryButton: () =>
        setConfirmDialog({ ...dialogText, open: false }),
    })
  }

  async function deleteEntry(entry?: Entry) {
    if (!entry) return

    setIsLoading(true)
    const { currentUser } = firebase.auth()
    await firebase
      .firestore()
      .collection('passwords')
      .doc(currentUser?.uid)
      .collection('entries')
      .doc(entry.id)
      .delete()

    setIsLoading(false)
    setEntries([...entries.filter((e) => e.id !== entry.id)])
    setSnackBar({ open: true, type: 'success', message: t('DELETED') })
    setConfirmDialog({ open: false })
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

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
        <IconButton onClick={copyClipBoard}>
          <AssignmentIcon />
        </IconButton>

        <IconButton onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon className={classes.menuItemIcon}>
              <FileCopyIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Clone Entry
            </Typography>
          </MenuItem>

          <MenuItem onClick={onClickDeleteEntry}>
            <ListItemIcon className={classes.menuItemIcon}>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Delete Entry
            </Typography>
          </MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default EntryListItem
