import { SortablejsOptions } from 'angular-sortablejs';
export interface IAngularPicklistOptions extends SortablejsOptions{
  checkable?: boolean; // default false
  showEmpty?: boolean; // default true
  searchable?: boolean; // default false
}