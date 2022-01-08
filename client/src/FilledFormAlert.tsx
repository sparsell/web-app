import * as React from 'react';
import { Prompt } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';
interface Props {
  formData: object;
  counter: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    visibility: 'hidden',
  },
}));

function FilledFormAlert(props: Props) {
  const classes = useStyles();
  const handleNotEmpty = () => {
    return 'hi';
  };
  return (
    <div className={classes.modal}>
      <Prompt when={props.counter === true} message={handleNotEmpty} />
      <button> ho </button>
      <div>hi</div>
    </div>
  );
}

export default FilledFormAlert;
