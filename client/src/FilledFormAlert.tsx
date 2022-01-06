import * as React from 'react';
import { Prompt } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';
interface Props {
  formData: object;
  counter: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    visibility: 'hidden',
  },
}));

function FilledFormAlert(props: Props) {
  const classes = useStyles();
  const [visible, setVisible] = React.useState<boolean>(false);
  const handleNotEmpty = () => {
    console.log(visible);
  };
  const newModalSetting = () => {
    setVisible(false);
    handleNotEmpty();
    Object.values(props.formData).map((x) => {
      if (x !== '') {
        setVisible(true);
        handleNotEmpty();
      }
    });
    return 'hi there';
  };
  return (
    <div className={classes.modal}>
      <Prompt when={props.counter > 0} message={newModalSetting} />
      <button> ho </button>
      <div>hi</div>
    </div>
  );
}

export default FilledFormAlert;
