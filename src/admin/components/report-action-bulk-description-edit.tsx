import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Text,
  DrawerContent,
  DrawerFooter,
  Button,
  MessageBox,
  Icon,
  Input,
} from '@adminjs/design-system';

import { RouteComponentProps, withRouter } from 'react-router';
import { appendForceRefresh } from './utils/append-force-refresh';

import {
  ActionHeader,
  ActionProps,
  AddNoticeProps,
  ApiClient,
  BasePropertyComponent,
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
        <MessageBox
          mb="xxl"
          variant="danger"
          message={translateMessage('theseRecordsWillBeRemoved', resource.id, {
            count: records.length,
          })}
        />
        <Table>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <BasePropertyComponent
                    where="list"
                    property={resource.titleProperty}
                    resource={resource}
                    record={record}
                  />
                </TableCell>
              </TableRow>
            ))}
            <Input
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </TableBody>
        </Table>
      </DrawerContent>
      <DrawerFooter>
        <Button
          variant="primary"
          size="lg"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <Icon icon="Fade" spin /> : null}
          {translateButton('confirmRemovalMany', resource.id, {
            count: records.length,
          })}
        </Button>
      </DrawerFooter>
    </React.Fragment>
  );
};

const FormattedBulkDescriptionEdit = withNotice(
  withRouter(ReportBulkDescriptionEdit),
);

export default FormattedBulkDescriptionEdit;
