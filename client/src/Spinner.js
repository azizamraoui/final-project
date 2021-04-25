import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
 
  loading:{
    position: 'absolute',
    top: '50%',
    left: '50%',
  }
}));

export default function Spinner() {
  const classes = useStyles();
  return (
    <div className="loding-block">
      <CircularProgress className={classes.loading} />
    </div>
  );
}
