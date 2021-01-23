import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import * as MUI from '@material-ui/core'
import { SettingContext } from '../contexts/SettingContext'
import useLocalStorage from '../hooks/useLocalStorage'

export default function Login() {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    autoLock,
    setAutoLock,
    autoLockTime,
    setAutoLockTime,
    passwordExpiration,
    setPasswordExpiration,
    daysToExpire,
    setDaysToExpire,
  } = useContext(SettingContext)
  const { t, i18n } = useTranslation()
  const [storage, setStorage] = useLocalStorage('USER_SETTING', {
    theme,
    language,
    autoLock,
    autoLockTime,
    passwordExpiration,
    daysToExpire,
  })

  return (
    <MUI.Container className="app-content">
      <MUI.Card>
        <MUI.CardContent>
          <MUI.Typography variant="h4">{t('SETTING.SETTING')}</MUI.Typography>
          <MUI.List>
            <MUI.ListSubheader>{t('SETTING.GENERAL')}</MUI.ListSubheader>

            {/* テーマ */}
            <MUI.ListItem>
              <MUI.ListItemText>{t('SETTING.THEME')}</MUI.ListItemText>
              <MUI.ListItemSecondaryAction>
                <MUI.Select
                  value={theme}
                  onChange={({ target: { value } }) => {
                    const theme = value as 'light' | 'dark'
                    setTheme(theme)
                    setStorage({ ...storage, theme })
                  }}
                >
                  <MUI.MenuItem value="light">Light</MUI.MenuItem>
                  <MUI.MenuItem value="dark">Dark</MUI.MenuItem>
                </MUI.Select>
              </MUI.ListItemSecondaryAction>
            </MUI.ListItem>

            {/* 言語 */}
            <MUI.ListItem>
              <MUI.ListItemText>{t('SETTING.LANGUAGE')}</MUI.ListItemText>
              <MUI.ListItemSecondaryAction>
                <MUI.Select
                  value={language}
                  onChange={({ target: { value } }) => {
                    const language = value as string
                    setLanguage(language)
                    i18n.changeLanguage(language)
                    setStorage({ ...storage, language })
                  }}
                >
                  <MUI.MenuItem value="ja">
                    {t('SETTING.JAPANESE')}
                  </MUI.MenuItem>
                  <MUI.MenuItem value="en">{t('SETTING.ENGLISH')}</MUI.MenuItem>
                </MUI.Select>
              </MUI.ListItemSecondaryAction>
            </MUI.ListItem>

            <MUI.Divider style={{ marginTop: '2rem' }} />

            <MUI.ListSubheader>{t('SETTING.SECURITY')}</MUI.ListSubheader>

            {/* 自動ロック */}
            <MUI.ListItem>
              <MUI.ListItemText>{t('SETTING.AUTO_LOCK')}</MUI.ListItemText>
              <MUI.ListItemSecondaryAction>
                <MUI.Switch
                  color="primary"
                  checked={autoLock}
                  onChange={({ target: { checked } }) => {
                    setAutoLock(checked)
                    setStorage({ ...storage, autoLock: checked })
                  }}
                ></MUI.Switch>
              </MUI.ListItemSecondaryAction>
            </MUI.ListItem>

            {/* 自動ロックまでの秒数 */}
            <MUI.ListItem>
              <MUI.ListItemText>自動ロックまでの時間</MUI.ListItemText>
              <MUI.ListItemSecondaryAction>
                <MUI.TextField
                  type="number"
                  label="time (sec)"
                  defaultValue="300"
                  inputProps={{
                    min: 0,
                  }}
                  disabled={!autoLock}
                  onChange={({ target: { value } }) => {
                    const autoLockTime = Number(value)
                    setAutoLockTime(autoLockTime)
                    setStorage({ ...storage, autoLockTime })
                  }}
                ></MUI.TextField>
              </MUI.ListItemSecondaryAction>
            </MUI.ListItem>

            {/* パスワード有効期限 */}
            <MUI.ListItem>
              <MUI.ListItemText>
                {t('SETTING.PASSWORD_EXPIRATION')}
              </MUI.ListItemText>
              <MUI.ListItemSecondaryAction>
                <MUI.Switch
                  color="primary"
                  checked={passwordExpiration}
                  onChange={({ target: { checked } }) => {
                    setPasswordExpiration(checked)
                    setStorage({ ...storage, passwordExpiration: checked })
                  }}
                ></MUI.Switch>
              </MUI.ListItemSecondaryAction>
            </MUI.ListItem>

            {/* 期限切れまでの日数 */}
            <MUI.ListItem>
              <MUI.ListItemText>{t('SETTING.DAYS_TO_EXPIRE')}</MUI.ListItemText>
              <MUI.ListItemSecondaryAction>
                <MUI.TextField
                  type="number"
                  label="Days"
                  defaultValue="180"
                  inputProps={{
                    min: 0,
                  }}
                  disabled={!passwordExpiration}
                  onChange={({ target: { value } }) => {
                    const daysToExpire = Number(value)
                    setDaysToExpire(daysToExpire)
                    setStorage({ ...storage, daysToExpire })
                  }}
                ></MUI.TextField>
              </MUI.ListItemSecondaryAction>
            </MUI.ListItem>
          </MUI.List>
        </MUI.CardContent>
      </MUI.Card>
    </MUI.Container>
  )
}
