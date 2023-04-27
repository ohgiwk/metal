import React, { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as MUI from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { ListContext } from '../../contexts/ListContext'
import useAPI from '../../hooks/useAPI'

const useStyles = makeStyles(() => ({
  dialogTitle: { paddingBottom: '0' },
  textField: { marginRight: '10px' },
}))

const GroupDialog: React.FC<{}> = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  // prettier-ignore
  const { selectedGroup, groupDialog: open, setGroupDialog: setOpen } = useContext(ListContext)
  const [name, setName] = useState('')
  const { createGroup, updateGroup } = useAPI()

  useEffect(() => {
    setName(selectedGroup?.name ?? '')
  }, [selectedGroup])

  const create = () => {
    createGroup(name)
    setName('')
    setOpen(false)
  }
  const update = () => {
    if (selectedGroup) {
      updateGroup(selectedGroup, name)
      setOpen(false)
    }
  }

  return (
    <MUI.Dialog open={open} onClose={() => setOpen(false)}>
      <MUI.DialogTitle className={classes.dialogTitle}>
        グループの作成
      </MUI.DialogTitle>
      <MUI.DialogContent>
        <form>
          <MUI.TextField
            label="Group Name"
            value={name}
            onChange={({ target: { value: name } }) => setName(name)}
            className={classes.textField}
            inputProps={{ maxLength: 10 }}
          ></MUI.TextField>
        </form>
      </MUI.DialogContent>
      <MUI.DialogActions>
        <MUI.Button onClick={() => setOpen(false)} color="default">
          {t('CANCEL')}
        </MUI.Button>
        <MUI.Button
          onClick={selectedGroup ? update : create}
          color="primary"
          variant="contained"
          disabled={name.length === 0}
        >
          {selectedGroup ? t('SAVE') : t('CREATE_NEW')}
        </MUI.Button>
      </MUI.DialogActions>
    </MUI.Dialog>
  )
}

export default GroupDialog
