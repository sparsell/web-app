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
    color: 'blue',
  },
}));

function FilledFormAlert(props: Props) {
  const classes = useStyles();
  const [shown, isShown] = React.useState<boolean>(false);
  //const [clicked, isClicked] = React.useState<boolean>(false);
  const handleNotEmpty = () => {
    console.log(shown);
    isShown(true);

    return 'hi';
  };
  return (
    <div className={classes.modal}>
      <Prompt when={props.counter === true} message={handleNotEmpty} />
      <button> ho </button>
      {shown ? <Modal /> : null}
    </div>
  );
}

const Modal = () => {
  return (
    <div>
      <p>this is a modal</p>
    </div>
  );
};

export default FilledFormAlert;
