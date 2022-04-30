import { BasePropertyProps } from 'adminjs';

const ReportPhotoList = (props: BasePropertyProps) => {
  const { record, property } = props;
  return <img width={400} src={record.params[property.path]}></img>;
};

export default ReportPhotoList;
