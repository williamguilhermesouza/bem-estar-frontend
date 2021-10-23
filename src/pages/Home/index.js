import React from 'react';
import Sidebar from '../../components/Sidebar';
import Agenda from '../../components/Agenda';
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => createStyles({
  root: {
    height: '400px',
    width: '100%',
  },
  buttonStack: {
    marginRight: '20px',
  },
  userButtons: {
    width: '200px',
  },

}));

export default function Home() {
  const classes = useStyles();

  return(
    <>
      <Sidebar />
      <div className={classes.root}>
        <Agenda />
      </div>
    </>
  );
}