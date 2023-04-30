import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  searchIcon: {
    margin: '18px 5px 0 0',
    color: 'gray',
  },
  sortField: {
    marginTop: '14px',
  },
  searchField: {
    width: '90%',
    margin: '0',
  },
  createNew: {
    marginLeft: 'auto',
  },
  noEntry: {
    color: 'gray',
    textAlign: 'center',
    marginTop: '2rem',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  card: {
    background: theme.palette.background.default,
  },
}))
