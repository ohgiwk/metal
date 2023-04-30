import { useEffect, useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import dayjs from 'dayjs'

import { PasswordInput, PasswordGenerator } from '..'

import { Entry, Group } from '../../common/Types'
import { AppContext, ListContext, SettingContext } from '../../contexts'
import useAPI from '../../hooks/useAPI'

import { useStyles } from './style'
import { Autocomplete } from '@material-ui/lab'

interface State {
  title: string
  username: string
  password: string
  note: string
  url: string
  group: string
}
// エントリ初期値
const initialState = {
  title: '',
  username: '',
  password: '',
  note: '',
  group: '',
  url: '',
}

export default function EntryDialog() {
  const { t } = useTranslation()
  const { setSnackBar, setIsLoading } = useContext(AppContext)
  const { groups, selectedEntry } = useContext(ListContext)
  const { entryDialog: open, setEntryDialog: setOpen } = useContext(ListContext)
  const { daysToExpire } = useContext(SettingContext)
  const { createEntry, updateEntry, saveEntries } = useAPI()

  // ダイアログの表示状態
  const [state, setState] = useState<State>(initialState)
  // パスワード強度
  const [passwordLevel, setPasswordLevel] = useState(0)

  // パスワードが有効期限切れかどうか
  const isExpired = selectedEntry
    ? dayjs().isAfter(dayjs(selectedEntry.updatedAt).add(daysToExpire, 'days'))
    : false

  useEffect(() => {
    // 選択されたエントリがあれば、編集中のエントリとしてセットする
    if (selectedEntry) {
      setState(selectedEntry as State)
      checkPasswordLevel(selectedEntry.password)
    } else {
      setState(initialState)
    }
  }, [setState, selectedEntry])

  /**
   * 保存ボタン押下時の処理
   */
  const onClickSave = async () => {
    setIsLoading(true)

    // エントリ選択時は更新、新規作成時は作成
    await saveEntries(
      selectedEntry ? updateEntry(selectedEntry, state) : createEntry(state)
    )

    setSnackBar({ open: true, type: 'success', message: t('CREATED') })
    setIsLoading(false)
    setOpen(false)
    // 次回ダイアログ表示時にリセットされるようにする
    setState(initialState)
  }

  // 保存せずに閉じたとき、編集中のエントリをリセットする
  const onCancel = () => {
    // リセット
    setState((selectedEntry as State) ?? initialState)
    setOpen(false)
  }

  const checkPasswordLevel = (password: string) => {
    let level = password.length * 2
    level = level > 100 ? 100 : level
    setPasswordLevel(level)
  }

  return (
    <View
      {...{
        state,
        setState,
        open,
        groups,
        selectedEntry,
        onCancel,
        passwordLevel,
        isExpired,
        onClickSave,
      }}
    />
  )
}

interface Props {
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
  open: boolean
  groups: Group[]
  selectedEntry: Entry | undefined
  passwordLevel: number
  isExpired: boolean
  onClickSave: () => void
  onCancel: () => void
}

// ダイアログの表示部分
const View: React.FC<Props> = ({
  state,
  setState,
  groups,
  selectedEntry,
  open,
  passwordLevel,
  isExpired,
  onClickSave,
  onCancel,
}) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const getPassLevelState = (level: number) => {
    if (level > 50) {
      return { className: classes.passwordLevel_high, text: '強' }
    } else if (level > 25) {
      return { className: classes.passwordLevel_middle, text: '中' }
    } else {
      return { className: classes.passwordLevel_row, text: '弱' }
    }
  }

  return (
    <Dialog open={open} onClose={onCancel} fullWidth>
      <DialogTitle className={classes.dialogTitle}>
        {t('CREATE_ENTRY')}
      </DialogTitle>
      <DialogContent>
        {selectedEntry && (
          <div className={classes.date}>
            CREATED: {dayjs(selectedEntry?.createdAt).format('YYYY/MM/DD')}
          </div>
        )}

        {isExpired && (
          <Typography className={classes.expired} color="error">
            <ErrorOutlineIcon
              className={classes.warningIcon}
              fontSize="small"
            />
            <span className={classes.warning}>Password Expired</span>
          </Typography>
        )}

        <TextField
          label={t('TITLE')}
          value={state.title}
          onChange={({ target: { value: title } }) =>
            setState({ ...state, title })
          }
          className={classes.textField}
          fullWidth
          autoFocus
          margin="dense"
        ></TextField>

        <div>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                label={t('USERNAME')}
                value={state.username}
                onChange={({ target: { value: username } }) =>
                  setState({ ...state, username })
                }
                className={classes.half}
              ></TextField>
            </Grid>

            <Grid item xs={6}>
              <div className={classes.half}>
                <PasswordInput
                  className={classes.password}
                  label={t('PASSWORD')}
                  value={state.password}
                  onChange={({ target: { value: password } }) => {
                    setState({ ...state, password })
                    // checkPasswordLevel(password)
                  }}
                />

                {(() => {
                  const { text, className } = getPassLevelState(passwordLevel)
                  return (
                    <>
                      <LinearProgress
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
            </Grid>
          </Grid>
          <div className={classes.generator}>
            <PasswordGenerator
              onSubmit={(password: string) => setState({ ...state, password })}
            />
          </div>
        </div>

        <TextField
          label={t('NOTE')}
          multiline
          rows={3}
          value={state.note}
          onChange={({ target: { value: note } }) =>
            setState({ ...state, note })
          }
          className={classes.textField}
        ></TextField>

        <TextField
          label={t('URL')}
          value={state.url}
          onChange={({ target: { value: url } }) => setState({ ...state, url })}
          className={classes.textField}
        ></TextField>

        <div>
          <FormControl className={classes.formControl}>
            <Autocomplete
              freeSolo
              value={state.group}
              options={groups}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={({ target: { value: group } }) => {
                    console.log(group)
                    setState({ ...state, group: group as string })
                  }}
                  label={t('GROUP')}
                />
              )}
            />
            {/* <Select
              value={state.group}
              onChange={({ target: { value: group } }) => {
                setState({ ...state, group: group as string })
              }}
            >
              {groups.map((g, i) => (
                <MenuItem key={i} value={g.id}>
                  {g.name}
                </MenuItem>
              ))}
            </Select> */}
          </FormControl>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} color="default">
          {t('CANCEL')}
        </Button>

        <Button onClick={onClickSave} color="primary" variant="contained">
          {selectedEntry ? t('SAVE') : t('CREATE_NEW')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
