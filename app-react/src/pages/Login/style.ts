import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  login: {
    fontFamily: "'Lora', serif",
  },
  content: {
    textAlign: 'center',
  },
  textField: {
    width: '90%',
    margin: '0 0 1rem',
  },
  button: {
    marginTop: '1rem',
  },
  or: {
    fontSize: '14px',
    color: 'gray',
    marginTop: '1rem',
  },
  sns: {
    [theme.breakpoints.up('md')]: {
      borderLeft: '1px #ddd solid',
      paddingLeft: '1.7rem',
    },
    [theme.breakpoints.down('sm')]: {
      borderTop: '1px #ddd solid',
      paddingTop: '1.7rem',
      marginTop: '1.7rem',
    },
  },
  forgotPassword: {
    fontSize: '14px',
  },
  container: {
    minHeight: '100vh',
    display: 'flex !important',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
}))
