import { Button } from '@material-ui/core'
import { useStyles } from './style'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'

interface Props {
  isLoading: boolean
  sns: 'facebook' | 'twitter' | 'github'
}

export default function SNSLoginButton(props: Props) {
  const classes = useStyles()

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      size="large"
      // onClick={props.onClickLoginButton}
      disabled={props.isLoading}
      className={classes[props.sns]}
    >
      {props.sns === 'facebook' && <FacebookIcon className={classes.icon} />}
      {props.sns === 'twitter' && <TwitterIcon className={classes.icon} />}
      {props.sns === 'github' && <GitHubIcon className={classes.icon} />}
    </Button>
  )
}
