import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';

interface Props {
  formData: object;
  counter: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    color: 'blue',
  },
}));

function FilledFormAlert(props: Props) {
  const classes = useStyles();
  return <div className={classes.modal}> hi </div>;
}

export default FilledFormAlert;
