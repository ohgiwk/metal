import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// prettier-ignore
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import HomeIcon from '@material-ui/icons/Home'
import SettingsIcon from '@material-ui/icons/Settings'
import GithubIcon from '@material-ui/icons/GitHub'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import { AppContext } from '../../contexts/AppContext'

const useStyles = makeStyles({
  list: { width: 250, height: '100%' },
  fullList: { width: 'auto' },
  spaceOuter: {
    height: 'calc(100% - 225px)',
    maskImage:
      'radial-gradient(#000 20%, transparent 20%), radial-gradient(#000 20%, transparent 20%)',
    maskSize: '15px 15px',
    maskPosition: '0 0, 7px 7px',
  },
  space: {
    height: '100%',
    maskImage: 'linear-gradient(0deg, #000 20%, transparent 100%)',
  },
  spaceInner: {
    background:
      'linear-gradient( 30deg, #f1c40f, #e74c3c, #1abc9c, #3498db, #9b59b6, #f1c40f)',
    backgroundSize: '500% 500%',
    animation: 'slideGradient 15s ease infinite',
    height: '100%',
  },
})

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
