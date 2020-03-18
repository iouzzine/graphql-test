import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  AppBar: {
    background: '#2D728F'
  },
  titleflexGrow: {
    marginLeft: theme.spacing(4),
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: '#fff',
    marginRight: theme.spacing(1)
  },
  modal: {
    background: '#292F36'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: '#fff'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 4)
  },
  link: {
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
      color: '#C4D6B0'
    }
  }
}));

export default useStyles;
