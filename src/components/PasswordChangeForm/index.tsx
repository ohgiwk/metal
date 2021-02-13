import { useState } from 'react'
import * as MUI from '@material-ui/core'
import PasswordInput from '../PasswordInput'
import { useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  item: { height: '70px' },
  button: { paddingTop: '60px' },
}))

export default function PasswordChangeForm() {
  const classes = useStyles()
  const muiTheme = useTheme()
  const upToSm = useMediaQuery(muiTheme.breakpoints.up('sm'))

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPassword2, setNewPassword2] = useState('')

  return (
    <MUI.List>
      <MUI.ListSubheader>パスワード変更</MUI.ListSubheader>

      <MUI.ListItem className={classes.item}>
        <MUI.ListItemText>{upToSm && '現在のパスワード'}</MUI.ListItemText>
        <MUI.ListItemSecondaryAction>
          <PasswordInput
            label={upToSm ? '' : '現在のパスワード'}
            value={currentPassword}
            labelShrink={true}
            onChange={({ target: { value: password } }) => {
              setCurrentPassword(password)
            }}
          />
        </MUI.ListItemSecondaryAction>
      </MUI.ListItem>

      <MUI.ListItem className={classes.item}>
        <MUI.ListItemText>{upToSm && '新しいパスワード'}</MUI.ListItemText>
        <MUI.ListItemSecondaryAction>
          <PasswordInput
            label={upToSm ? '' : '新しいパスワード'}
            value={newPassword}
            labelShrink={true}
            onChange={({ target: { value: password } }) => {
              setNewPassword(password)
            }}
          />
        </MUI.ListItemSecondaryAction>
      </MUI.ListItem>

      <MUI.ListItem className={classes.item}>
        <MUI.ListItemText>
          {upToSm && '新しいパスワード (確認)'}
        </MUI.ListItemText>
        <MUI.ListItemSecondaryAction>
          <PasswordInput
            label={upToSm ? '' : '新しいパスワード (確認)'}
            value={newPassword2}
            labelShrink={true}
            onChange={({ target: { value: password } }) => {
              setNewPassword2(password)
            }}
          />
        </MUI.ListItemSecondaryAction>
      </MUI.ListItem>

      <MUI.ListItem className={classes.button}>
        <MUI.ListItemSecondaryAction>
          <MUI.Button variant="contained" color="primary">
            パスワード変更
          </MUI.Button>
        </MUI.ListItemSecondaryAction>
      </MUI.ListItem>
    </MUI.List>
  )
}
