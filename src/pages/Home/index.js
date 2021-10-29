import React from 'react';
import Sidebar from '../../components/Sidebar';
import Agenda from '../../components/Agenda';
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => createStyles({
  root: {},
}));

export default function Home() {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <Sidebar />
      <Agenda />
    </div>
  );
}