import AdminJS, { OverridableComponent } from 'adminjs';

const BASE = './components';
const bundle = (path: string, componentName?: OverridableComponent) =>
  AdminJS.bundle(`${BASE}/${path}`, componentName);

export const DASHBOARD = bundle('dashboard');
export const ReportPhotoList = bundle('report-photo-list');
export const ReportPhotoShow = bundle('report-photo-show');
export const ReportLatLongList = bundle('report-latLong-list');
export const ReportLatLongShow = bundle('report-latLong-show');
export const ReportBulkDescriptionEdit = bundle(
  'report-action-bulk-description-edit',
);
