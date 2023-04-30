import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    paddingBottom: '0',
  },
  half: {
    margin: ' 0 1rem 1rem 0',
    width: '95%',
  },
  textField: {
    marginBottom: '1rem',
    width: '100%',
  },
  password: {
    width: '100%',
  },
  generator: {
    marginBottom: '1rem',
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 200,
  },
  date: {
    fontSize: '12px',
    color: 'gray',
    textAlign: 'right',
    marginBottom: '0.5rem',
  },
  expired: {
    textAlign: 'right',
  },
  warning: {
    verticalAlign: 'middle',
  },
  warningIcon: {
    verticalAlign: 'middle',
    margin: '0 5px 3px 0',
  },
  passwordLevel_high: {
    '& > .MuiLinearProgress-bar': {
      background: '#ff0000',
    },
  },
  passwordLevel_middle: {
    '& > .MuiLinearProgress-bar': {
      background: '#ffff00',
    },
  },
  passwordLevel_row: {
    '& > .MuiLinearProgress-bar': {
      background: '#0000ff',
    },
  },
}))
