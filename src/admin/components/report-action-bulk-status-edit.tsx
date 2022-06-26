import React, { useState } from 'react';
import {
  Text,
  DrawerContent,
  DrawerFooter,
  Button,
  Icon,
  Label,
} from '@adminjs/design-system';

import { RouteComponentProps, withRouter } from 'react-router';
import { appendForceRefresh } from './utils/append-force-refresh';

import {
  ActionHeader,
  ActionProps,
  AddNoticeProps,
  ApiClient,
  useTranslation,
  withNotice,
} from 'adminjs';

const ReportBulkStatusEdit: React.FC<
  ActionProps & AddNoticeProps & RouteComponentProps
> = (props) => {
  const { resource, records, action, addNotice, history } = props;
  const availableValues = resource.properties.status.availableValues;
  const acceptedValue = availableValues.find((v) => v.value === 'ACCEPTED');
  const defaultValue = availableValues ? acceptedValue.value : null;

  const [status, setStatus] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const { translateMessage, translateButton } = useTranslation();

  if (!availableValues) {
    return <Text>{translateMessage('error')}</Text>;
  }

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
        data: { status },
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
        <Label>{translateMessage('status', resource.id)}</Label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {availableValues.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
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

const FormattedBulkStatusEdit = withNotice(withRouter(ReportBulkStatusEdit));

export default FormattedBulkStatusEdit;
