import { BasePropertyProps } from 'adminjs';

const ReportLatLongList = (props: BasePropertyProps) => {
  const { record, property } = props;
  return (
    <a
      target="_blank"
      href={`https://maps.google.com/?q=${record.params[property.path]}`}
    >
      {record.params[property.path]}
    </a>
  );
};

export default ReportLatLongList;
