import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// prettier-ignore
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import HomeIcon from '@material-ui/icons/Home'
import SettingsIcon from '@material-ui/icons/Settings'
import GithubIcon from '@material-ui/icons/GitHub'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import { AppContext } from '../../contexts/AppContext'
import { useStyles } from './style'

interface Props {
  open: boolean
  setOpen: Function
}

export default function DrawerMenu(props: Props) {
  const { open, setOpen } = props
  const { isAuth, setInfoDialog } = useContext(AppContext)

  const { t } = useTranslation()
  const classes = useStyles()

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    const { key } = event as React.KeyboardEvent
    if (event.type === 'keydown' && (key === 'Tab' || key === 'Shift')) {
      return
    }

    setOpen(open)
  }

  return (
    <div>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <div>
            <List>
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={t('DRAWER.HOME')} />
              </ListItem>
            </List>

            <Divider />

            <List>
              {isAuth && (
                <ListItem button component={Link} to="/setting">
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('DRAWER.SETTING')} />
                </ListItem>
              )}

              <ListItem
                button
                component="a"
                target="new"
                href="https://github.com/ohgiwk/metal"
              >
                <ListItemIcon>
                  <GithubIcon />
                </ListItemIcon>
                <ListItemText primary={t('DRAWER.GITHUB')} />
                <OpenInNewIcon />
              </ListItem>

              <ListItem button onClick={() => setInfoDialog(true)}>
                <ListItemText primary={t('DRAWER.ABOUT_THIS_APP')} />
              </ListItem>
            </List>
          </div>

          <div className={classes.spaceOuter}>
            <div className={classes.space}>
              <div className={classes.spaceInner}></div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
