import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import * as MUI from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import firebase from 'firebase'
import moment from 'moment'
import CryptoJS from 'crypto-js'

import PasswordInput from '../PasswordInput'
import { AppContext } from '../../contexts/AppContext'
import { ListContext } from '../../contexts/ListContext'

const useStyles = makeStyles((theme) => ({
  dialogTitle: { paddingBottom: '0' },
  textField: { margin: ' 0 1rem 1rem 0', width: '47%' },
  textArea: { marginBottom: '1rem', width: '100%' },
  formControl: { margin: theme.spacing(1), minWidth: 120 },
  date: {
    fontSize: '12px',
    color: 'gray',
    textAlign: 'right',
    marginBottom: '1rem',
  },
}))

interface State {
  title: string
  username: string
  password: string
  note: string
  url: string
  group: string
}

export default function EntryDialog() {
  const classes = useStyles()
  const { t } = useTranslation()

  const masterPassword = 'master'

  const { setIsLoading, setSnackBar } = useContext(AppContext)
  const { entries, setEntries, groups, selectedEntry } = useContext(ListContext)
  const { entryDialog: open, setEntryDialog: setOpen } = useContext(ListContext)

  const initialState = useMemo(
    () => ({
      title: '',
      username: '',
      password: '',
      note: '',
      group: '',
      url: '',
    }),
    []
  )
  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    if (selectedEntry) {
      const password = CryptoJS.AES.decrypt(
        selectedEntry?.password,
        masterPassword
      ).toString(CryptoJS.enc.Utf8)

      setState({ ...selectedEntry, password } as State)
    } else {
      setState(initialState)
    }
  }, [initialState, selectedEntry, setState])

  /**
   * エントリー作成
   */
  async function createEntry() {
    setIsLoading(true)
    const now = new Date().getTime()
    // 暗号化
    const password = CryptoJS.AES.encrypt(
      state.password,
      masterPassword
    ).toString()

    const entry = {
      ...state,
      password,
      url: '',
      group: '',
      createdAt: now,
      updatedAt: now,
    }
    // TODO: 暗号化

    const db = firebase.firestore()
    let doc = db.collection('passwords').doc(firebase.auth().currentUser?.uid)

    if (!(await doc.get()).exists) {
      await doc.set({})
    }

    doc = await doc.collection('entries').add(entry)

    setState(initialState)
    setOpen(false)
    setIsLoading(false)

    setEntries([...entries, { id: doc.id, ...entry }])
    setSnackBar({ open: true, type: 'success', message: t('CREATED') })
  }

  /**
   * エントリー更新
   */
  async function updateEntry() {
    setIsLoading(true)

    if (selectedEntry) {
      // 暗号化
      const password = CryptoJS.AES.encrypt(
        state.password,
        masterPassword
      ).toString()

      const targetEntry = { ...selectedEntry, ...state, password }

      await firebase
        .firestore()
        .collection('passwords')
        .doc(firebase.auth().currentUser?.uid)
        .collection('entries')
        .doc(targetEntry?.id)
        .update(targetEntry)

      setOpen(false)
      setIsLoading(false)

      setEntries([
        ...entries.map((e) => (e.id === targetEntry?.id ? targetEntry : e)),
      ])
      setSnackBar({ open: true, type: 'success', message: t('UPDATED') })
    }
  }

  return (
    <MUI.Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <MUI.DialogTitle className={classes.dialogTitle}>
        {t('CREATE_ENTRY')}
      </MUI.DialogTitle>
      <MUI.DialogContent>
        {selectedEntry && (
          <div className={classes.date}>
            CREATED: {moment(selectedEntry?.createdAt).format('YYYY/MM/DD')}
          </div>
        )}

        <MUI.TextField
          label={t('TITLE')}
          value={state.title}
          onChange={({ target: { value: title } }) =>
            setState({ ...state, title })
          }
          className={classes.textArea}
          fullWidth
          autoFocus
          margin="dense"
        ></MUI.TextField>
        <div>
          <MUI.TextField
            label={t('USERNAME')}
            value={state.username}
            onChange={({ target: { value: username } }) =>
              setState({ ...state, username })
            }
            className={classes.textField}
          ></MUI.TextField>
          <PasswordInput
            label={t('PASSWORD')}
            value={state.password}
            onChange={({ target: { value: password } }) =>
              setState({ ...state, password })
            }
            className={classes.textField}
          />
        </div>

        <MUI.TextField
          label={t('NOTE')}
          multiline
          rows={3}
          value={state.note}
          onChange={({ target: { value: note } }) =>
            setState({ ...state, note })
          }
          className={classes.textArea}
        ></MUI.TextField>
        <MUI.TextField
          label={t('URL')}
          value={state.url}
          onChange={({ target: { value: url } }) => setState({ ...state, url })}
          className={classes.textArea}
        ></MUI.TextField>
        <div>
          <MUI.FormControl className={classes.formControl}>
            <MUI.InputLabel>{t('GROUP')}</MUI.InputLabel>
            <MUI.Select
              value={state.group}
              onChange={({ target: { value: group } }) => {
                setState({ ...state, group: group as string })
              }}
            >
              {groups.map((g, i) => (
                <MUI.MenuItem key={i} value={g.id}>
                  {g.name}
                </MUI.MenuItem>
              ))}
            </MUI.Select>
          </MUI.FormControl>
        </div>
      </MUI.DialogContent>
      <MUI.DialogActions>
        <MUI.Button onClick={() => setOpen(false)} color="default">
          {t('CANCEL')}
        </MUI.Button>
        <MUI.Button
          onClick={selectedEntry ? updateEntry : createEntry}
          color="primary"
          variant="contained"
        >
          {selectedEntry ? t('SAVE') : t('CREATE_NEW')}
        </MUI.Button>
      </MUI.DialogActions>
    </MUI.Dialog>
  )
}
