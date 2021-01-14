import React, { useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'
import { makeStyles } from '@material-ui/core/styles'
import { ListContext } from '../contexts/ListContext'

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp': {
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
  },
}))

export default function FAB() {
  const classes = useStyles()
  const { t } = useTranslation()
  const {
    setSelectedEntry,
    setEntryDialog,
    setSelectedGroup,
    setGroupDialog,
  } = useContext(ListContext)
  const [fab, setFab] = useState(false)

  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      className={classes.speedDial}
      icon={<SpeedDialIcon />}
      open={fab}
      onClose={() => setFab(false)}
      onOpen={() => setFab(true)}
      direction="up"
    >
      <SpeedDialAction
        key="Add Entry"
        color="primary"
        icon={<AddIcon />}
        tooltipTitle={t('ADD_ENTRY')}
        onClick={() => {
          setSelectedEntry(undefined)
          setEntryDialog(true)
        }}
      />
      <SpeedDialAction
        key="Add Group"
        icon={<CreateNewFolderIcon />}
        tooltipTitle={t('ADD_GROUP')}
        onClick={() => {
          setSelectedGroup(undefined)
          setGroupDialog(true)
        }}
      />
    </SpeedDial>
  )
}
