import { BasePropertyProps, PropertyPlace } from 'adminjs';
import { Icon } from '@adminjs/design-system';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled('div')<{ where: PropertyPlace }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ where }) => (where === 'list' ? 'center' : 'normal')};
`;

const ReportPhoto = (props: BasePropertyProps) => {
  const { record, property, where } = props;
  const url: string = record.params[property.path];
  const filename = url.split('/').pop();
  const [type, setType] = useState<string>(null);
  const [status, setStatus] = useState<number>(null);
  const [copied, setCopied] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const head = await fetch(url, { method: 'HEAD' });
      setType(head.headers.get('Content-Type'));
      setStatus(head.status);
    })();
  }, [url]);

  const width = { show: 800, list: 360 };

  return (
    <Container where={where}>
      <a download href={url}>
        {type?.includes('video') && (
          <video width={width[where]} controls>
            <source src={url} type={type} />
            Your browser does not support the video tag.
          </video>
        )}
        {type?.includes('image') && <img width={width[where]} src={url}></img>}
      </a>
      {status === 404 ? (
        <span
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(filename);
            setCopied(true);
          }}
        >
          <Icon icon={copied ? 'Checkmark' : 'Copy'} /> {filename}
        </span>
      ) : (
        <a download href={url}>
          ⬇️ DOWNLOAD
        </a>
      )}
    </Container>
  );
};

export default ReportPhoto;
