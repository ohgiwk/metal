import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useContext } from 'react'
import { SettingContext } from '../contexts/SettingContext'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    flexDirection: 'column',
  },
  h1: {
    fontSize: '4rem',
    fontFamily: "'Lora', serif",
    marginBottom: '3rem',
    opacity: '0.3',
    letterSpacing: '2px',
  },
}))
export default function AppLoading() {
  const classes = useStyles()
  const { theme } = useContext(SettingContext)

  return (
    <Backdrop
      style={{ color: theme === 'dark' ? '#443c46' : '#fff' }}
      className={classes.backdrop}
      open={true}
    >
      <h1 className={classes.h1}>Metal</h1>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
