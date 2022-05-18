import { BasePropertyProps } from 'adminjs';
import { ValueGroup } from '@adminjs/design-system';
import ReportPhoto from './report-photo';

const ReportPhotoShow = (props: BasePropertyProps) => {
  const { property } = props;
  return (
    <ValueGroup label={property.label}>
      <ReportPhoto {...props} />
    </ValueGroup>
  );
};

export default ReportPhotoShow;
