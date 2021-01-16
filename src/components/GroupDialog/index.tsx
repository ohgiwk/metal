import React, { useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as MUI from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import firebase from 'firebase'

import { AppContext } from '../../contexts/AppContext'
import { ListContext } from '../../contexts/ListContext'

const useStyles = makeStyles(() => ({
  dialogTitle: { paddingBottom: '0' },
  textField: { marginRight: '10px' },
}))

const GroupDialog: React.FC<{}> = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { setIsLoading, setSnackBar } = useContext(AppContext)
  // prettier-ignore
  const { groups, setGroups, selectedGroup, groupDialog: open, setGroupDialog: setOpen } = useContext(ListContext)
  const [name, setName] = useState('')

  useEffect(() => {
    setName(selectedGroup?.name ?? '')
  }, [selectedGroup])

  /**
   *
   */
  async function createGroup() {
    setIsLoading(true)

    const now = new Date().getTime()
    const group = {
      name,
      createdAt: now,
      updatedAt: now,
    }

    const db = firebase.firestore()
    let doc = db.collection('passwords').doc(firebase.auth().currentUser?.uid)

    if (!(await doc.get()).exists) {
      await doc.set({})
    }

    doc = await doc.collection('groups').add(group)

    setName('')
    setOpen(false)
    setIsLoading(false)

    setGroups([...groups, { id: doc.id, ...group }])
    setSnackBar({ open: true, type: 'success', message: t('CREATED') })
  }

  /**
   *
   */
  async function updateGroup() {
    setIsLoading(true)

    if (selectedGroup) {
      const targetGroup = { ...selectedGroup, name }

      await firebase
        .firestore()
        .collection('passwords')
        .doc(firebase.auth().currentUser?.uid)
        .collection('groups')
        .doc(targetGroup?.id)
        .update(targetGroup)

      setOpen(false)
      setIsLoading(false)

      setGroups([
        ...groups.map((e) => (e.id === targetGroup?.id ? targetGroup : e)),
      ])
      setSnackBar({ open: true, type: 'success', message: t('UPDATED') })
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
          onClick={selectedGroup ? updateGroup : createGroup}
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
