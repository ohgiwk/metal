import { makeStyles } from '@material-ui/core/styles'
export const useStyles = makeStyles(() => ({
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
  container: {
    minHeight: '100vh',
    display: 'flex !important',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
}))
