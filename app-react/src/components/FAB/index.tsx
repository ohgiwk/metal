import { useContext } from 'react'
import { SpeedDial, SpeedDialIcon } from '@material-ui/lab'

import { makeStyles } from '@material-ui/core/styles'
import { ListContext } from '../../contexts/ListContext'

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
  const { setSelectedEntry, setEntryDialog } = useContext(ListContext)

  const addEntry = () => {
    setSelectedEntry(undefined)
    setEntryDialog(true)
  }

  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      className={classes.speedDial}
      icon={<SpeedDialIcon />}
      open={false}
      onClick={addEntry}
      direction="up"
    ></SpeedDial>
  )
}
