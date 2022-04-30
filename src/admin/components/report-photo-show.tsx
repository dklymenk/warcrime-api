import { BasePropertyProps } from 'adminjs';
import { ValueGroup } from '@adminjs/design-system';

const ReportPhotoShow = (props: BasePropertyProps) => {
  const { record, property } = props;
  return (
    <ValueGroup label={property.label}>
      <img width={800} src={record.params[property.path]}></img>
    </ValueGroup>
  );
};

export default ReportPhotoShow;
