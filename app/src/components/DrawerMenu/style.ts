import { makeStyles } from '@material-ui/core/styles'
export const useStyles = makeStyles({
    list: {
      width: 250,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
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
