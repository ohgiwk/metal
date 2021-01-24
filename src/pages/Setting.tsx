import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import * as MUI from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { SettingContext } from '../contexts/SettingContext'
import useLocalStorage from '../hooks/useLocalStorage'
import PasswordInput from '../components/PasswordInput'

const useStyles = makeStyles(() => ({
  select: { width: '120px' },
}))

const TabPanel = ({ children, value, index, ...other }: any) => (
  <div role="tabpanel" {...other}>
    {value === index && <MUI.Box p={3}>{children}</MUI.Box>}
  </div>
)

export default function Login() {
  const classes = useStyles()
  // prettier-ignore
  const { theme, setTheme, language, setLanguage, autoLock, setAutoLock, autoLockTime, setAutoLockTime,
    passwordExpiration, setPasswordExpiration, daysToExpire, setDaysToExpire, } = useContext(SettingContext)
  const { t, i18n } = useTranslation()
  const [storage, setStorage] = useLocalStorage('USER_SETTING', {
    theme,
    language,
    autoLock,
    autoLockTime,
    passwordExpiration,
    daysToExpire,
  })

  const [tab, setTab] = React.useState(0)

  function getGeoLocation() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude //緯度を取得して定数latに代入
        const lng = pos.coords.longitude //経度を取得して定数lngに代入
        const accuracy = pos.coords.accuracy //同じく精度を定数accuracyに代入
        console.log(lat, lng, accuracy)
      },
      () => {
        window.alert('位置情報の取得に失敗しました。エラーコード：')
      }
    )
  }

  return (
    <MUI.Container className="app-content" maxWidth="md">
      <MUI.Box p={5} pb={0}>
        <MUI.Typography variant="h4">{t('SETTING.SETTING')}</MUI.Typography>

        <MUI.Tabs
          value={tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(_, value) => setTab(value)}
        >
          <MUI.Tab label={t('SETTING.GENERAL')} />
          <MUI.Tab label={t('SETTING.SECURITY')} />
        </MUI.Tabs>
      </MUI.Box>

      <TabPanel value={tab} index={0}>
        <MUI.List>
          <MUI.ListSubheader>UI</MUI.ListSubheader>
          {/* テーマ */}
          <MUI.ListItem>
            <MUI.ListItemText>{t('SETTING.THEME')}</MUI.ListItemText>
            <MUI.ListItemSecondaryAction>
              <MUI.Select
                className={classes.select}
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
                className={classes.select}
                value={language}
                onChange={({ target: { value } }) => {
                  const language = value as string
                  setLanguage(language)
                  i18n.changeLanguage(language)
                  setStorage({ ...storage, language })
                }}
              >
                <MUI.MenuItem value="ja">{t('SETTING.JAPANESE')}</MUI.MenuItem>
                <MUI.MenuItem value="en">{t('SETTING.ENGLISH')}</MUI.MenuItem>
              </MUI.Select>
            </MUI.ListItemSecondaryAction>
          </MUI.ListItem>

          <MUI.Divider style={{ marginTop: '2rem' }} />

          <MUI.ListSubheader>パスワード変更</MUI.ListSubheader>
          <MUI.ListItem>
            <MUI.ListItemText>現在のパスワード</MUI.ListItemText>
            <MUI.ListItemSecondaryAction>
              <PasswordInput label="" value="" onChange={() => {}} />
            </MUI.ListItemSecondaryAction>
          </MUI.ListItem>
          <MUI.ListItem>
            <MUI.ListItemText>新しいパスワード</MUI.ListItemText>
            <MUI.ListItemSecondaryAction>
              <PasswordInput label="" value="" onChange={() => {}} />
            </MUI.ListItemSecondaryAction>
          </MUI.ListItem>
          <MUI.ListItem>
            <MUI.ListItemText>新しいパスワード (確認)</MUI.ListItemText>
            <MUI.ListItemSecondaryAction>
              <PasswordInput label="" value="" onChange={() => {}} />
            </MUI.ListItemSecondaryAction>
          </MUI.ListItem>
          <MUI.ListItem style={{ paddingTop: '60px' }}>
            <MUI.ListItemText></MUI.ListItemText>
            <MUI.ListItemSecondaryAction>
              <MUI.Button variant="contained" color="primary">
                パスワード変更
              </MUI.Button>
            </MUI.ListItemSecondaryAction>
          </MUI.ListItem>
        </MUI.List>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <MUI.List>
          <MUI.ListSubheader>{t('SETTING.AUTO_LOCK')}</MUI.ListSubheader>

          {/* 自動ロック */}
          <MUI.ListItem>
            <MUI.ListItemText>有効 / 無効</MUI.ListItemText>
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
                inputProps={{ min: 0 }}
                disabled={!autoLock}
                onChange={({ target: { value } }) => {
                  const autoLockTime = Number(value)
                  setAutoLockTime(autoLockTime)
                  setStorage({ ...storage, autoLockTime })
                }}
              ></MUI.TextField>
            </MUI.ListItemSecondaryAction>
          </MUI.ListItem>

          <MUI.Divider style={{ marginTop: '2rem' }} />

          <MUI.ListSubheader>
            {t('SETTING.PASSWORD_EXPIRATION')}
          </MUI.ListSubheader>

          {/* パスワード有効期限 */}
          <MUI.ListItem>
            <MUI.ListItemText>有効 / 無効</MUI.ListItemText>
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
                inputProps={{ min: 0 }}
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
      </TabPanel>
    </MUI.Container>
  )
}
