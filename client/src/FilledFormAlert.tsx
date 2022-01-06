interface Props {
  when: boolean;
  message: string;
  formData: any;
}

function FilledFormAlert(props: Props) {
  console.log(props.formData.title);
  return <div> {props.message} </div>;
}

export default FilledFormAlert;
