import { BasePropertyProps } from 'adminjs';
import { ValueGroup } from '@adminjs/design-system';
import styled from 'styled-components';
const Container = styled('div')`
  display: flex;
  flex-direction: column;
`;

const ReportPhotoShow = (props: BasePropertyProps) => {
  const { record, property } = props;
  return (
    <ValueGroup label={property.label}>
      <Container>
        <a download href={record.params[property.path]}>
          <img width={800} src={record.params[property.path]}></img>
        </a>
        <a download href={record.params[property.path]}>
          ⬇️ DOWNLOAD
        </a>
      </Container>
    </ValueGroup>
  );
};

export default ReportPhotoShow;
