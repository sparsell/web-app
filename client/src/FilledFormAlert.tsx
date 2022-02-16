import * as React from 'react';
import { createBrowserHistory } from 'history';
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
  const history = createBrowserHistory();
  const onBlock = () => {
    if (window.confirm('hello')) {
      console.log('hi');
    }
  };
  const blocked = history.block(onBlock);
  window.addEventListener('change', () => {
    if (props.counter === true) {
      return blocked;
    }
  });
  return <div className={classes.modal}> hi </div>;
}

export default FilledFormAlert;
