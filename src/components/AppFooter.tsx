import * as MUI from '@material-ui/core'
import INfoRoundedIcon from '@material-ui/icons/InfoRounded'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    zIndex: theme.zIndex.speedDial - 1,
  },
  text: { color: 'gray' },
}))

const AppFooter = () => {
  const classes = useStyles()

  return (
    <MUI.AppBar
      position="fixed"
      color="inherit"
      className={classes.appBar}
      elevation={0}
    >
      <MUI.Toolbar variant="dense">
        <MUI.IconButton edge="start">
          <INfoRoundedIcon />
        </MUI.IconButton>
        <MUI.Typography className={classes.text}>
          This is Sample Application.
        </MUI.Typography>
      </MUI.Toolbar>
    </MUI.AppBar>
  )
}
export default AppFooter
