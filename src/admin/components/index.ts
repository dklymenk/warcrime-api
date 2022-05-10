import AdminJS, { OverridableComponent } from 'adminjs';

const BASE = './';
const bundle = (path: string, componentName: OverridableComponent = null) =>
  AdminJS.bundle(`${BASE}/${path}`, componentName);

export const Dashboard = bundle('dashboard');
export const ReportPhotoList = bundle('report-photo-list');
export const ReportPhotoShow = bundle('report-photo-show');
export const ReportLatLongList = bundle('report-latLong-list');
export const ReportLatLongShow = bundle('report-latLong-show');
