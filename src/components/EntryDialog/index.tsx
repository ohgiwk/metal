import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import * as MUI from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import PasswordInput from '../PasswordInput'
import { ListContext } from '../../contexts/ListContext'
import useAPI from '../../hooks/useAPI'

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

  const { groups, selectedEntry } = useContext(ListContext)
  const { entryDialog: open, setEntryDialog: setOpen } = useContext(ListContext)
  const { createEntry, updateEntry } = useAPI()

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
      setState(selectedEntry as State)
    } else {
      setState(initialState)
    }
  }, [initialState, setState, selectedEntry])

  const create = () => {
    createEntry(state)
    setState(initialState)
    setOpen(false)
  }

  const update = () => {
    if (selectedEntry) {
      updateEntry(selectedEntry, state)
      setOpen(false)
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
          onClick={selectedEntry ? update : create}
          color="primary"
          variant="contained"
        >
          {selectedEntry ? t('SAVE') : t('CREATE_NEW')}
        </MUI.Button>
      </MUI.DialogActions>
    </MUI.Dialog>
  )
}
