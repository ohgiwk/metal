import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
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
    <AppBar
      position="fixed"
      color="inherit"
      className={classes.appBar}
      elevation={0}
    >
      <Toolbar variant="dense">
        <IconButton edge="start">
          <INfoRoundedIcon />
        </IconButton>

        <Typography className={classes.text}>
          This is Sample Application.
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
export default AppFooter
