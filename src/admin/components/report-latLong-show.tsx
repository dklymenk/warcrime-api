import { BasePropertyProps } from 'adminjs';
import { ValueGroup } from '@adminjs/design-system';

const ReportLatLongShow = (props: BasePropertyProps) => {
  const { record, property } = props;
  return (
    <ValueGroup label={property.label}>
      <a
        target="_blank"
        href={`https://maps.google.com/?q=${record.params[property.path]}`}
      >
        {record.params[property.path]}
      </a>
    </ValueGroup>
  );
};

export default ReportLatLongShow;
