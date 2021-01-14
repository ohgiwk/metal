import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import * as MUI from '@material-ui/core'
import { SettingContext } from '../contexts/SettingContext'

export default function Login() {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    autoLock,
    setAutoLock,
  } = useContext(SettingContext)
  const { t, i18n } = useTranslation()

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
                  onChange={({ target: { value } }) =>
                    setTheme(value as 'light' | 'dark')
                  }
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
                    const lang = value as string
                    setLanguage(lang)
                    i18n.changeLanguage(lang)
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
                  checked={autoLock}
                  onChange={({ target: { checked } }) => setAutoLock(checked)}
                ></MUI.Switch>
              </MUI.ListItemSecondaryAction>
            </MUI.ListItem>

            {/* 自動ロックまでの秒数 */}
            <MUI.ListItem>
              <MUI.ListItemText>Auto Lock after inactivity of</MUI.ListItemText>
              <MUI.ListItemSecondaryAction>
                <MUI.TextField
                  type="number"
                  label="time (sec)"
                  defaultValue="300"
                  inputProps={{
                    min: 0,
                  }}
                  disabled={!autoLock}
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
                  checked={autoLock}
                  onChange={({ target: { checked } }) => setAutoLock(checked)}
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
                  disabled={!autoLock}
                ></MUI.TextField>
              </MUI.ListItemSecondaryAction>
            </MUI.ListItem>
          </MUI.List>
        </MUI.CardContent>
      </MUI.Card>
    </MUI.Container>
  )
}
