import { BasePropertyProps, ViewHelpers } from 'adminjs';

const ReportUserList = (props: BasePropertyProps) => {
  const { record, property } = props;
  const h = new ViewHelpers();
  const refId = record.params[property.path];
  const href = h.recordActionUrl({
    resourceId: property.reference,
    recordId: refId,
    actionName: 'show',
  });
  return (
    <a href={href}>
      {refId}
      <br />
      {record.populated[property.path].params.notes}
    </a>
  );
};

export default ReportUserList;
