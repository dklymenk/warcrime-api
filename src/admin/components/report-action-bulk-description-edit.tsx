import React, { useState } from 'react';
import {
  Text,
  DrawerContent,
  DrawerFooter,
  Button,
  Icon,
  Input,
  Label,
} from '@adminjs/design-system';

import { RouteComponentProps, withRouter } from 'react-router';
import { appendForceRefresh } from './utils/append-force-refresh';

import {
  ActionHeader,
  ActionProps,
  AddNoticeProps,
  ApiClient,
  PropertyLabel,
  useTranslation,
  withNotice,
} from 'adminjs';

const ReportBulkDescriptionEdit: React.FC<
  ActionProps & AddNoticeProps & RouteComponentProps
> = (props) => {
  const { resource, records, action, addNotice, history } = props;

  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { translateMessage, translateButton } = useTranslation();

  if (!records) {
    return (
      <Text>{translateMessage('pickSomeFirstToRemove', resource.id)}</Text>
    );
  }

  const handleClick = (): void => {
    const api = new ApiClient();
    setLoading(true);
    const recordIds = records.map((r) => r.id);
    api
      .bulkAction({
        data: { description },
        resourceId: resource.id,
        actionName: action.name,
        recordIds,
        method: 'post',
      })
      .then((response) => {
        setLoading(false);
        if (response.data.notice) {
          addNotice(response.data.notice);
        }
        if (response.data.redirectUrl) {
          const search = new URLSearchParams(window.location.search);
          // bulk function have recordIds in the URL so it has to be stripped before redirect
          search.delete('recordIds');
          history.push(
            appendForceRefresh(response.data.redirectUrl, search.toString()),
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        addNotice({
          message: translateMessage('bulkDeleteError', resource.id),
          type: 'error',
        });
        throw error;
      });
  };

  return (
    <React.Fragment>
      <DrawerContent>
        {action?.showInDrawer ? <ActionHeader omitActions {...props} /> : null}
        <Label>{translateMessage('description', resource.id)}</Label>
        <Input
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DrawerContent>
      <DrawerFooter>
        <Button
          variant="primary"
          size="lg"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <Icon icon="Fade" spin /> : null}
          {translateButton('confirm')}
        </Button>
      </DrawerFooter>
    </React.Fragment>
  );
};

const FormattedBulkDescriptionEdit = withNotice(
  withRouter(ReportBulkDescriptionEdit),
);

export default FormattedBulkDescriptionEdit;
