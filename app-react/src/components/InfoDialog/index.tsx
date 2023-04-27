import React, { useContext } from 'react'
// prettier-ignore
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AppContext } from '../../contexts/AppContext'

const useStyles = makeStyles(() => ({
  dialog: { fontFamily: "'Lora', serif" },
  content: { textAlign: 'center' },
}))

export default function InfoDialog() {
  const classes = useStyles()

  const { infoDialog: open, setInfoDialog: setOpen } = useContext(AppContext)
  const onClose = () => setOpen(false)

  return (
    <Dialog className={classes.dialog} open={open} onClose={onClose}>
      <DialogTitle>About</DialogTitle>
      <DialogContent className={classes.content}>
        <h2>Metal</h2>
        <h3>a Password Manager</h3>
        <p>created by Keiya Watanabe</p>
        <p>React, Typescript, Firebase</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}
