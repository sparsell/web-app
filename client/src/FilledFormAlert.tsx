import * as React from 'react';
import { Prompt } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';
interface Props {
  formData: object;
}

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    visibility: 'visible',
  },
}));

function FilledFormAlert(props: Props) {
  const classes = useStyles();
  const [visible, setVisible] = React.useState<boolean>(false);
  const handleNotEmpty = () => {
    console.log(visible);
    return visible;
  };
  React.useEffect(() => {
    handleNotEmpty();
  }, [visible]);
  const newModalSetting = () => {
    setVisible(false);
    Object.values(props.formData).map((x) => {
      if (x !== '') {
        setVisible(true);
      }
    });
    return 'hi there';
  };
  return (
    <div className={classes.modal}>
      <Prompt message={newModalSetting} />
      {visible ? <p> ho </p> : null}
      <div>hi</div>
    </div>
  );
}

export default FilledFormAlert;
