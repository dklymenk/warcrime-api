import { BasePropertyProps } from 'adminjs';
import styled from 'styled-components';
const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReportPhotoList = (props: BasePropertyProps) => {
  const { record, property } = props;
  return (
    <Container>
      <a download href={record.params[property.path]}>
        <img width={360} src={record.params[property.path]}></img>
      </a>
      <a download href={record.params[property.path]}>
        ⬇️ DOWNLOAD
      </a>
    </Container>
  );
};

export default ReportPhotoList;
