import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import * as MUI from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import dayjs from 'dayjs'

import PasswordInput from '../PasswordInput'
import { ListContext } from '../../contexts/ListContext'
import useAPI from '../../hooks/useAPI'
import PasswordGenerator from '../PasswordGenerator'
import { SettingContext } from '../../contexts/SettingContext'

import { useStyles } from './style'

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
  const { daysToExpire } = useContext(SettingContext)
  const { createEntry, updateEntry } = useAPI()

  const [passwordLevel, setPasswordLevel] = useState(0)

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
      checkPasswordLevel(selectedEntry.password)
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

  const checkPasswordLevel = (password: string) => {
    let level = password.length * 2
    level = level > 100 ? 100 : level
    setPasswordLevel(level)
  }
  const getPassLevelState = (level: number) => {
    if (level > 50) {
      return { className: classes.passwordLevel_high, text: '強' }
    } else if (level > 25) {
      return { className: classes.passwordLevel_middle, text: '中' }
    } else {
      return { className: classes.passwordLevel_row, text: '弱' }
    }
  }

  const onCancel = () => {
    // リセット
    setState((selectedEntry as State) ?? initialState)
    setOpen(false)
  }

  const isExpired = selectedEntry
    ? dayjs().isAfter(dayjs(selectedEntry.updatedAt).add(daysToExpire, 'days'))
    : false

  return (
    <MUI.Dialog open={open} onClose={onCancel} fullWidth>
      <MUI.DialogTitle className={classes.dialogTitle}>
        {t('CREATE_ENTRY')}
      </MUI.DialogTitle>
      <MUI.DialogContent>
        {selectedEntry && (
          <div className={classes.date}>
            CREATED: {dayjs(selectedEntry?.createdAt).format('YYYY/MM/DD')}
          </div>
        )}

        {isExpired && (
          <MUI.Typography className={classes.expired} color="error">
            <ErrorOutlineIcon
              className={classes.warningIcon}
              fontSize="small"
            />
            <span className={classes.warning}>Password Expired</span>
          </MUI.Typography>
        )}

        <MUI.TextField
          label={t('TITLE')}
          value={state.title}
          onChange={({ target: { value: title } }) =>
            setState({ ...state, title })
          }
          className={classes.textField}
          fullWidth
          autoFocus
          margin="dense"
        ></MUI.TextField>
        <div>
          <MUI.Grid container>
            <MUI.Grid item xs={6}>
              <MUI.TextField
                label={t('USERNAME')}
                value={state.username}
                onChange={({ target: { value: username } }) =>
                  setState({ ...state, username })
                }
                className={classes.half}
              ></MUI.TextField>
            </MUI.Grid>

            <MUI.Grid item xs={6}>
              <div className={classes.half}>
                <PasswordInput
                  className={classes.password}
                  label={t('PASSWORD')}
                  value={state.password}
                  onChange={({ target: { value: password } }) => {
                    setState({ ...state, password })
                    checkPasswordLevel(password)
                  }}
                />
                {(() => {
                  const { text, className } = getPassLevelState(passwordLevel)
                  return (
                    <>
                      <MUI.LinearProgress
                        variant="determinate"
                        value={passwordLevel}
                        className={className}
                      />
                      <div style={{ marginTop: '2px', fontSize: '11px' }}>
                        パスワード強度： {text}
                      </div>
                    </>
                  )
                })()}
              </div>
            </MUI.Grid>
          </MUI.Grid>
          <div className={classes.generator}>
            <PasswordGenerator
              onSubmit={(password: string) => setState({ ...state, password })}
            />
          </div>
        </div>

        <MUI.TextField
          label={t('NOTE')}
          multiline
          rows={3}
          value={state.note}
          onChange={({ target: { value: note } }) =>
            setState({ ...state, note })
          }
          className={classes.textField}
        ></MUI.TextField>

        <MUI.TextField
          label={t('URL')}
          value={state.url}
          onChange={({ target: { value: url } }) => setState({ ...state, url })}
          className={classes.textField}
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
        <MUI.Button onClick={onCancel} color="default">
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
